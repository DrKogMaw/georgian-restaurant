# LightPowerShell Static HTTP Web Server
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "Server started successfully at http://localhost:$port/ and http://127.0.0.1:$port/"
} catch {
    Write-Host "Failed to start listener on standard prefixes: $_"
    exit 1
}

$root = $PSScriptRoot
if (-not $root) {
    $root = "C:\Users\t.kumsiashvili\.gemini\antigravity-ide\scratch\georgian-restaurant"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        
        try {
            $request = $context.Request
            $response = $context.Response
            
            # Add CORS headers
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            $urlPath = $request.Url.LocalPath
            if ($urlPath -eq "/") { $urlPath = "/index.html" }
            
            $filePath = [System.IO.Path]::Combine($root, $urlPath.TrimStart('/').Replace('/', '\'))
            
            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                
                switch ($ext) {
                    ".html" { $response.ContentType = "text/html; charset=utf-8" }
                    ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                    ".js"   { $response.ContentType = "text/javascript; charset=utf-8" }
                    ".json" { $response.ContentType = "application/json; charset=utf-8" }
                    ".jpg"  { $response.ContentType = "image/jpeg" }
                    ".jpeg" { $response.ContentType = "image/jpeg" }
                    ".png"  { $response.ContentType = "image/png" }
                    ".webp" { $response.ContentType = "image/webp" }
                    ".svg"  { $response.ContentType = "image/svg+xml" }
                    ".ico"  { $response.ContentType = "image/x-icon" }
                    default { $response.ContentType = "application/octet-stream" }
                }
                
                $response.ContentLength64 = $bytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $msg.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($msg, 0, $msg.Length)
                }
            }
        } catch {
            Write-Host "Error processing request: $_"
        } finally {
            try { $response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}

