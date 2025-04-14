# Simple PowerShell HTTP Server
$ip = "10.0.0.235" # Your IP address
$port = 8080
$webroot = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://${ip}:${port}/")
$listener.Start()

Write-Host "Server started at http://${ip}:${port}/"
Write-Host "Web root: $webroot"
Write-Host "Press Ctrl+C to stop the server"

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".gif"  = "image/gif"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
    ".ico"  = "image/x-icon"
    ".json" = "application/json"
    ".svg"  = "image/svg+xml"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Get requested URL path
        $path = $request.Url.LocalPath
        
        # Default to index.html for root
        if ($path -eq "/") {
            $path = "/index.html"
        }
        
        $filename = Join-Path -Path $webroot -ChildPath $path.TrimStart("/")
        
        Write-Host "$(Get-Date) - $($request.HttpMethod) $($request.Url.PathAndQuery)"
        
        # Check if file exists
        if (Test-Path $filename -PathType Leaf) {
            try {
                $fileStream = [System.IO.File]::OpenRead($filename)
                $response.ContentLength64 = $fileStream.Length
                
                # Set content type based on file extension
                $extension = [System.IO.Path]::GetExtension($filename)
                $contentType = $mimeTypes[$extension.ToLower()]
                
                if ($contentType) {
                    $response.ContentType = $contentType
                } else {
                    $response.ContentType = "application/octet-stream"
                }
                
                # Copy file to response output stream
                $buffer = New-Object byte[] 8192
                $count = 0
                
                while (($count = $fileStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
                    $response.OutputStream.Write($buffer, 0, $count)
                }
                
                $fileStream.Close()
            }
            catch {
                Write-Host "Error serving file: $_"
                $response.StatusCode = 500
            }
        }
        else {
            Write-Host "File not found: $filename"
            $response.StatusCode = 404
            $content = "<html><body><h1>404 - File Not Found</h1><p>The file $path was not found on this server.</p></body></html>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.ContentType = "text/html"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
}
finally {
    $listener.Stop()
} 