using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Mvc;

namespace CsvProcessor.Controllers
{
    public class S3UploadController : ControllerBase
    {
        private readonly string bucketName = "diego-csv-processing-bucket";
        private readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast2;
        private readonly IAmazonS3? s3Client;

        public S3UploadController()
        {
            s3Client = new AmazonS3Client(bucketRegion);
        }

        [HttpPost("upload-csv")]
        public async Task<IActionResult> UploadCsv([FromForm] IFormFile File, string FileName)
        {
            try
            {
                if (File == null || File.Length == 0)
                    return BadRequest("No file uploaded.");

                if (!File.FileName.EndsWith(".csv"))
                    return BadRequest("File is not a .csv file.");

                await using (var stream = File.OpenReadStream())
                {
                    var transferUtility = new TransferUtility(s3Client);
                    await transferUtility.UploadAsync(stream, bucketName, FileName);
                }

                return Ok(new { Message = "File successfully uploaded." });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, new { Message = $"Amazon S3 error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occured: {ex.Message}" });
            }
        }
    }
}
