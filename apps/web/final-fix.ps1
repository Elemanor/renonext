# Final comprehensive color fix for remaining files
$files = @(
"app\(main)\pros\[id]\page.tsx",
"app\(main)\blog\[id]\page.tsx",
"app\(main)\admin\managed\[id]\page.tsx",
"app\(main)\pros\[id]\reviews\page.tsx",
"app\(main)\pro-dashboard\jobs\[id]\pro-job-detail-content.tsx",
"app\(main)\dashboard\jobs\[id]\job-detail-content.tsx"
)

# Complete replacement list covering ALL variants
$replacements = @(
    "text-primary-700", "text-reno-green-dark",
    "text-primary-600", "text-reno-green-dark",
    "text-primary-500", "text-reno-green",
    "bg-primary-700", "bg-reno-green-dark",
    "bg-primary-600", "bg-reno-green-dark",
    "bg-primary-500", "bg-reno-green",
    "bg-primary-200", "bg-reno-green-light",
    "bg-primary-100", "bg-reno-green-light",
    "bg-primary-50", "bg-reno-green-light",
    "hover:bg-primary-700", "hover:bg-reno-green-dark",
    "hover:bg-primary-600", "hover:bg-reno-green-dark",
    "hover:text-primary-600", "hover:text-reno-green-dark",
    "border-primary-600", "border-reno-green-dark",
    "border-primary-300", "border-reno-green",
    "border-primary-200", "border-reno-green-light",
    "from-primary-600", "from-reno-green-dark",
    "to-primary-600", "to-reno-green-dark",
    "focus:border-primary-500", "focus:border-reno-green",
    "focus:ring-primary-500", "focus:ring-reno-green",
    "ring-primary-200/50", "ring-reno-green-light/50",
    "hover:bg-primary-50", "hover:bg-reno-green-light",
    "accent-primary-600", "accent-reno-green-dark",
    "shadow-primary-200", "shadow-reno-green-light"
)

$count = 0
foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        $modified = $false
        for ($i = 0; $i -lt $replacements.Count; $i += 2) {
            $old = $replacements[$i]
            $new = $replacements[$i + 1]
            if ($content -match [regex]::Escape($old)) {
                $content = $content -replace [regex]::Escape($old), $new
                $modified = $true
            }
        }
        if ($modified) {
            Set-Content -Path $path -Value $content -NoNewline
            $count++
            Write-Host "Updated: $file"
        }
    }
}
Write-Host "`nModified $count files"
