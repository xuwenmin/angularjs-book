<?php

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

/*$sFileName = $_FILES['fileData']['name'];
$sFileType = $_FILES['fileData']['type'];
$sFileSize = bytesToSize1024($_FILES['fileData']['size'], 1);*/

$targetFolder = '/uploads';

if (!empty($_FILES)) {
        $tempFile = $_FILES['fileData']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
        $targetFile = rtrim($targetPath,'/') . '/' . $_FILES['fileData']['name'];
        
        // Validate the file type
        // $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
        // $fileParts = pathinfo($_FILES['fileData']['name']);
        
        move_uploaded_file($tempFile,$targetFile);
        echo '1';
}
