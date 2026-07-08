$base = Get-Content 'D:\s-class\REFH\01\courseware\assets\js\shared.js' -Raw
$i = $base.IndexOf('  let _pdfLibsPromise = null;')
$j = $base.IndexOf('  let _qrLibPromise = null;')
$block = $base.Substring($i, $j - $i)
foreach ($n in '02','03','04','05','06') {
  $f = "D:\s-class\REFH\$n\courseware\assets\js\shared.js"
  $c = Get-Content $f -Raw
  $c2 = [regex]::Replace($c, '(?s)  let _pdfLibsPromise = null;.*?  let _qrLibPromise = null;', ($block + '  let _qrLibPromise = null;'), 1)
  Set-Content -Path $f -Value $c2 -NoNewline -Encoding utf8
  Write-Output "patched $n"
}
foreach ($n in '01','02','03','04','05','06') {
  $pf = "D:\s-class\REFH\$n\courseware\part2-reading.html"
  $h = Get-Content $pf -Raw
  $h2 = $h -replace 'shared\.js\?v=20260709e', 'shared.js?v=20260709f'
  Set-Content -Path $pf -Value $h2 -NoNewline -Encoding utf8
  Write-Output "bumped $n"
}
