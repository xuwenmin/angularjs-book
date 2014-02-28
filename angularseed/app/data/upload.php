<?php

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

/*$sFileName = $_FILES['fileData']['name'];
$sFileType = $_FILES['fileData']['type'];
$sFileSize = bytesToSize1024($_FILES['fileData']['size'], 1);*/

$targetFolder = '/uploads';


$arg = json_decode($_POST['fileData'],true);
/*var_dump($arg);
exit;*/
$result = array();
for($i =0;$i<count($arg);$i++){
    $s = base64_decode(str_replace('data:'.$arg[$i]['type'].';base64,', '', $arg[$i]['info']));
    file_put_contents('uploads/'.$arg[$i]['name'], $s);
    $result[$i] = $arg[$i]['name'];
}
echo json_encode($result);
/*if (!empty($_FILES)) {
        $tempFile = $_FILES['fileData']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
        $targetFile = rtrim($targetPath,'/') . '/' . $_FILES['fileData']['name'];
        
        // Validate the file type
        $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
        $fileParts = pathinfo($_FILES['fileData']['name']);
        
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
