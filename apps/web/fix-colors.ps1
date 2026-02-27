# Color replacement script
# Find all .tsx files excluding ui components
$files = Get-ChildItem -Recurse -Include *.tsx | Where-Object { $_.FullName -notlike '*\components\ui\*' } | ForEach-Object { $_.FullName.Replace("$PSScriptRoot\", "") }

$replacements = @(
    # Group hover/active states
    @{Old="group-hover:from-primary-100"; New="group-hover:from-reno-green-light"},
    @{Old="group-hover:to-primary-200/50"; New="group-hover:to-reno-green-light/50"},
    @{Old="group-hover:shadow-primary-500/35"; New="group-hover:shadow-reno-green/35"},
    @{Old="group-hover:text-primary-600"; New="group-hover:text-reno-green-dark"},
    @{Old="hover:border-primary-400"; New="hover:border-reno-green"},
    @{Old="hover:border-primary-300"; New="hover:border-reno-green"},
    @{Old="hover:bg-primary-600"; New="hover:bg-reno-green-dark"},
    @{Old="hover:bg-primary-700"; New="hover:bg-reno-green-dark"},
    @{Old="hover:bg-primary-50"; New="hover:bg-reno-green-light"},
    @{Old="hover:text-primary-900"; New="hover:text-reno-green-dark"},
    @{Old="hover:text-primary-700"; New="hover:text-reno-green-dark"},
    @{Old="hover:text-primary-600"; New="hover:text-reno-green-dark"},
    @{Old="hover:text-primary-500"; New="hover:text-reno-green"},
    @{Old="hover:text-primary-400"; New="hover:text-reno-green"},
    @{Old="hover:shadow-primary-500/35"; New="hover:shadow-reno-green/35"},
    # Focus states
    @{Old="focus:ring-primary-500"; New="focus:ring-reno-green"},
    @{Old="focus:ring-primary-400"; New="focus:ring-reno-green"},
    @{Old="focus:ring-primary-300"; New="focus:ring-reno-green"},
    @{Old="focus:ring-primary-100"; New="focus:ring-reno-green-light"},
    @{Old="focus:border-primary-500"; New="focus:border-reno-green"},
    @{Old="focus:border-primary-400"; New="focus:border-reno-green"},
    @{Old="focus:border-primary-300"; New="focus:border-reno-green"},
    # Text colors
    @{Old="text-primary-700"; New="text-reno-green-dark"},
    @{Old="text-primary-600"; New="text-reno-green-dark"},
    @{Old="text-primary-500"; New="text-reno-green"},
    @{Old="text-primary-400"; New="text-reno-green"},
    @{Old="text-primary-300"; New="text-reno-green"},
    @{Old="text-primary-200"; New="text-reno-green-light"},
    # Background colors
    @{Old="bg-primary-600"; New="bg-reno-green-dark"},
    @{Old="bg-primary-500"; New="bg-reno-green"},
    @{Old="bg-primary-400"; New="bg-reno-green"},
    @{Old="bg-primary-200"; New="bg-reno-green-light"},
    @{Old="bg-primary-100"; New="bg-reno-green-light"},
    @{Old="bg-primary-50"; New="bg-reno-green-light"},
    # Border colors
    @{Old="border-primary-600"; New="border-reno-green-dark"},
    @{Old="border-primary-500"; New="border-reno-green"},
    @{Old="border-primary-400"; New="border-reno-green"},
    @{Old="border-primary-300"; New="border-reno-green"},
    @{Old="border-primary-200"; New="border-reno-green-light"},
    @{Old="border-primary-100"; New="border-reno-green-light"},
    # Gradient colors
    @{Old="from-primary-700"; New="from-reno-green-dark"},
    @{Old="from-primary-600"; New="from-reno-green-dark"},
    @{Old="from-primary-500"; New="from-reno-green"},
    @{Old="from-primary-400"; New="from-reno-green"},
    @{Old="from-primary-100"; New="from-reno-green-light"},
    @{Old="from-primary-50"; New="from-reno-green-light"},
    @{Old="to-primary-700"; New="to-reno-green-dark"},
    @{Old="to-primary-600"; New="to-reno-green-dark"},
    @{Old="to-primary-500"; New="to-reno-green"},
    @{Old="to-primary-400"; New="to-reno-teal"},
    @{Old="to-primary-200"; New="to-reno-green-light"},
    @{Old="to-primary-100/50"; New="to-reno-green-light/50"},
    @{Old="to-primary-100"; New="to-reno-green-light"},
    @{Old="via-primary-700"; New="via-reno-green-dark"},
    @{Old="via-primary-600"; New="via-reno-green-dark"},
    @{Old="via-primary-500"; New="via-reno-green"},
    # Ring colors
    @{Old="ring-primary-500"; New="ring-reno-green"},
    @{Old="ring-primary-300"; New="ring-reno-green"},
    @{Old="ring-primary-200/50"; New="ring-reno-green-light/50"},
    @{Old="ring-primary-200"; New="ring-reno-green-light"},
    @{Old="ring-primary-100"; New="ring-reno-green-light"},
    # Shadow colors
    @{Old="shadow-primary-600/40"; New="shadow-reno-green-dark/40"},
    @{Old="shadow-primary-600/25"; New="shadow-reno-green-dark/25"},
    @{Old="shadow-primary-600/20"; New="shadow-reno-green-dark/20"},
    @{Old="shadow-primary-500/25"; New="shadow-reno-green/25"},
    @{Old="shadow-primary-500/35"; New="shadow-reno-green/35"},
    @{Old="shadow-primary-200/50"; New="shadow-reno-green-light/50"},
    @{Old="shadow-primary-200"; New="shadow-reno-green-light"},
    @{Old="shadow-primary-100"; New="shadow-reno-green-light"},
    # Fill & stroke
    @{Old="fill-primary-600"; New="fill-reno-green-dark"},
    @{Old="fill-primary-500"; New="fill-reno-green"},
    @{Old="stroke-primary-500"; New="stroke-reno-green"},
    # Accent colors (for checkboxes, radios)
    @{Old="accent-primary-600"; New="accent-reno-green-dark"},
    @{Old="accent-primary-500"; New="accent-reno-green"},
    # Opacity variants
    @{Old="primary-600/40"; New="reno-green-dark/40"},
    @{Old="primary-600/30"; New="reno-green-dark/30"},
    @{Old="primary-600/20"; New="reno-green-dark/20"},
    @{Old="primary-600/10"; New="reno-green-dark/10"},
    @{Old="primary-500/30"; New="reno-green/30"},
    @{Old="primary-500/20"; New="reno-green/20"},
    @{Old="primary-500/10"; New="reno-green/10"},
    @{Old="primary-400/25"; New="reno-green/25"},
    # Additional edge cases
    @{Old="focus-visible:ring-primary-500"; New="focus-visible:ring-reno-green"},
    @{Old="shadow-primary-200/50"; New="shadow-reno-green-light/50"}
)

$count = 0
foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        $modified = $false
        foreach ($repl in $replacements) {
            if ($content -match [regex]::Escape($repl.Old)) {
                $content = $content -replace [regex]::Escape($repl.Old), $repl.New
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
