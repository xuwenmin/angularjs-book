<?php

/*function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

$sFileName = $_FILES['image_file']['name'];
$sFileType = $_FILES['image_file']['type'];
$sFileSize = bytesToSize1024($_FILES['image_file']['size'], 1);

var_dump($_POST) ;
$targetFolder = '/uploads'; // Relative to the root
if (!empty($_FILES)) {
        $tempFile = $_FILES['image_file']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
        $targetFile = rtrim($targetPath,'/') . '/' . $_FILES['image_file']['name'];
        
        // Validate the file type
        $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
        $fileParts = pathinfo($_FILES['image_file']['name']);
        
        if (in_array($fileParts['extension'],$fileTypes)) {
            move_uploaded_file($tempFile,$targetFile);
            echo '1';
        } else {
            echo 'Invalid file type.';
        }
}

echo <<<EOF
<p>Your file: {$sFileName} has been successfully received.</p>
<p>Type: {$sFileType}</p>
<p>Size: {$sFileSize}</p>
EOF;*/

$aa = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAeCAYAAACsYQl4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9ZJREFUeNrsWl9P1EAQ35nuHYeSGOBEIiEm/nn0RQyo38L4ZOIXNPhBBOET+IRIhHiEF+Du+mfHmW0r5Wh7vbZ3YOwkl+7fudnfzs7O7iwQkWpo+oQNBLMhnVWxr+em9qfdzTXs7R6Zsv0XN1b12f6xf1dA3PCHY9tAlulIA7r79gkqCqRbopTsqiAjfEhZfpRoEqVBJYqD4JHS+kTF/w1cSmSzZL+ExP/DSbR5Y5IrDx1jXgQI30dElzYGAEzIEhQghukwzxJa2ZAzRsoMhbLbukTaMuO+wkNks7wUl/O3t/PTlAFaF9LArTUGmNrKH7ZZUC3gMrCORU7S9mOHIe00KYpBxgjwaMCgCMBXg8EH1elsJ+YCVQiCtiAbM0dkOuGXWlze4vx81NgxrveJ2nr771QTcwVgBjAkmXgAj399CpEbcl1AIgPFQIrM3I4ESRVEbBxJc4kAakj6Oc6QZfYB0AUHPZ44t7v52OV6t7cz2Yocq9G8zLUywUJv7/issbSR4r1eXVSOc85g+0U1GsfZ0gbkmyR4UBAsWHyqeh3drXVZzu0G5HQ6FbDJtGtw78RmFmf0XxLjs1xQq7Mbhd6DbtDMwdmXDbrYgW8MkFTYBo1uCPFmGpfX6ZdPg2fMdxKexgQdNBpjr6rsZhi6cBMOfBTgf4XKyMvu5zzb6To0upx2ZWlFWtuslTCuLo9v0dWVBu4kWm1kD7t+mLr9u47kAOIB5q2EoqskC7xJVlcRJUnX6KAuG10fVbWnaf2nZauLI83HUVJ3S6PHaXsVm357+wFpttN3S6Onoe3S71Y3XVCevXiahUan2cGyGprXL6uurJdTxwSBQh8QzMxMR3Kwk9jNvH7T5jnKq8yEMcj961fGOW2zbu8O3j1FZfyl3t7J7+YMmE4PXi4+h1b74NnuD7+iRoNp4MxBB2CAWNVG2+iC8hs4c4DWzkUckamg0QI0ug2ceTbacQF1NY3u7RzyTIFrowkN3aCljZVlsCGtw+peh41Uo3PegD0C8quVZQXO+em3X4VNa6EoeBiyobYNBCSDs2XPU/3+e7x/78vEPCJRzeDyI3TmPyeM3FW1vUaXwKtE0u01r8iOJjCt8CRHEviV9e5IGuSWUokckHTbLu1hJPSTh+joCy4dgMa+DdQiukmQa31uEIW2lLpqX9oHJ897CK3WSRkeNsLueWuq1Tq6AhputonkjMUNxylPFyQCbuxThvCJQxi9T8BsIHyfYCPmljd/xbtgmyzmVJ3uXn9yUPu7jrqo+2Yde18PS7uOVR/gTOOupjTQDdVLzdu7GdEfAQYA0GVEhPs9qdMAAAAASUVORK5CYII=';
$aa1 = 'data:image/gif;base64,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';
$imgData = $aa1;
$s = base64_decode(str_replace('data:image/gif;base64,', '', $imgData));
file_put_contents('uploads/1.gif', $s);
echo '保存图片成功';
