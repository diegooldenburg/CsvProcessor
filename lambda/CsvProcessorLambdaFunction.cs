using System;
using System.IO;
using System.Linq;
using Amazon.Lambda.Core;
using Amazon.Lambda.S3Events;
using Amazon.S3;
using Amazon.S3.Model;
using CsvHelper;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

public class Function
{
    private readonly IAmazonS3 s3Client;

    public Function()
    {
        s3Client = new AmazonS3Client();
    }

    public async Task FunctionHandler(S3Event evnt, ILambdaContext context)
    {
        var record = evnt.Records?[0].S3;
        if (record == null)
        {
            context.Logger.LogLine("No S3 record found in the event.");
            LambdaLogger.Log("No S3 record found in the event.");
            return;
        }

        var bucketName = record.Bucket.Name;
        var s3FileName = record.Object.Key;

        context.Logger.LogLine(bucketName);
        context.Logger.LogLine(s3FileName);
        LambdaLogger.Log(bucketName);
        LambdaLogger.Log(s3FileName);

        var getObjectRequest = new GetObjectRequest
        {
            BucketName = bucketName,
            Key = s3FileName
        };

        try
        {
            using (var response = await s3Client.GetObjectAsync(getObjectRequest))
            using (var reader = new StreamReader(response.ResponseStream))
            using (var csv = new CsvReader(reader, new CsvHelper.Configuration.CsvConfiguration(CultureInfo.InvariantCulture)))
            {
                var records = csv.GetRecords<dynamic>().ToList();
                foreach (var row in records)
                {
                    context.Logger.LogLine(row.ToString());
                    LambdaLogger.Log(row.ToString());
                }
            }
        }
        catch (Exception ex)
        {
            context.Logger.LogLine($"Error: {ex.Message}");
            LambdaLogger.Log($"Error: {ex.Message}");
        }
    }
}
