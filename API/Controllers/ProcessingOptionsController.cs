using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProcessingOptionsController : ControllerBase
    {
        private readonly IAmazonDynamoDB _dynamoDbClient;
        // private const string TableName = "CsvProcessingOptions";

        public ProcessingOptionsController()
        {
            _dynamoDbClient = new AmazonDynamoDBClient(RegionEndpoint.USEast2);
        }

        [HttpPost("upload-options")]
        public async Task<IActionResult> UploadOptions([FromBody] ProcessingOptions options)
        {
            try
            {
                using var context = new DynamoDBContext(_dynamoDbClient);
                await context.SaveAsync(options);
                return Ok(new { Message = "Options successfully uploaded." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured: {ex.Message}" });
            }
        }
    }

    [DynamoDBTable("CsvProcessingOptions")]
    public class ProcessingOptions
    {
        [DynamoDBHashKey]
        public string FileName { get; set; } //Partition key
        public string OutputType { get; set; }
        public List<SortingOptions> SortBy { get; set; }
        public bool DropNull { get; set; }
    }

    public class SortingOptions
    {
        public string Column { get; set; }
        public string Type { get; set; }
        public string Order { get; set; }
    }
}