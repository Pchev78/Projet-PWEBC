<?php
if (isset($headerTitle) && is_string($headerTitle)) {
    echo '<title>'. $headerTitle . '</title>'. PHP_EOL;
}

if (isset($headerLinks) && is_array($headerLinks)) {
    foreach ($headerLinks as $href => $relationType) {
        echo '<link rel="' . $relationType .'" href="' . $href . '"/>' . PHP_EOL;
    }
}

if (isset($headerScripts) && is_array($headerScripts)) {
    foreach ($headerScripts as $path) {
        echo '<script src="'. $path . '"></script>' . PHP_EOL;
    }
}