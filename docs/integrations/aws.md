# AWS Integration

Integrate with Amazon Web Services.

## Setup

```bash
nexflow config set aws-access-key-id AKIAIOSFODNN7EXAMPLE
nexflow config set aws-secret-access-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
nexflow config set aws-region us-east-1
```

## S3 Actions

### Upload File

```yaml
steps:
  - name: Upload to S3
    action: aws.s3.upload
    bucket: my-bucket
    key: uploads/${{ event.filename }}
    body: ${{ event.file }}
```

### Download File

```yaml
steps:
  - name: Download from S3
    action: aws.s3.download
    bucket: my-bucket
    key: data/export.csv
```

### List Objects

```yaml
steps:
  - name: List files
    action: aws.s3.list
    bucket: my-bucket
    prefix: uploads/
```

## Lambda Actions

### Invoke Function

```yaml
steps:
  - name: Process data
    action: aws.lambda.invoke
    function: data-processor
    payload: ${{ event.body }}
```

## SQS Actions

### Send Message

```yaml
steps:
  - name: Queue task
    action: aws.sqs.send
    queue: https://sqs.us-east-1.amazonaws.com/123456789/my-queue
    message: ${{ event.body }}
```

### Receive Messages

```yaml
steps:
  - name: Poll queue
    action: aws.sqs.receive
    queue: https://sqs.us-east-1.amazonaws.com/123456789/my-queue
    max_messages: 10
```
