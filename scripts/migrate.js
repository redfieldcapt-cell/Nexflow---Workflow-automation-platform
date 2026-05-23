const { Client } = require('pg');
const logger = require('../src/logger');

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    logger.info('Connected to database');
    
    // Create workflows table
    await client.query(`
      CREATE TABLE IF NOT EXISTS workflows (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        definition JSONB NOT NULL,
        enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create executions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS executions (
        id VARCHAR(255) PRIMARY KEY,
        workflow_id VARCHAR(255) REFERENCES workflows(id),
        status VARCHAR(50) NOT NULL,
        input JSONB,
        output JSONB,
        error TEXT,
        started_at TIMESTAMP NOT NULL,
        completed_at TIMESTAMP,
        duration INTEGER
      )
    `);
    
    // Create execution_steps table
    await client.query(`
      CREATE TABLE IF NOT EXISTS execution_steps (
        id SERIAL PRIMARY KEY,
        execution_id VARCHAR(255) REFERENCES executions(id),
        name VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        output JSONB,
        error TEXT,
        duration INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_executions_workflow_id 
      ON executions(workflow_id)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_executions_status 
      ON executions(status)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_execution_steps_execution_id 
      ON execution_steps(execution_id)
    `);
    
    logger.info('Database migration completed successfully');
    
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { migrate };
