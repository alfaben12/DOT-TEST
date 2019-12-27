<?php
function findTwoSum($data, $sum){
    for ($i=0; $i < count($data); $i++) { 
        for ($j=0; $j+1 < count($data); $j++) { 
            $one = $data[$i];
            $two = $data[$j];
            $total = $one + $two;
            if($total == $sum){
                echo $i. " dan ". $j ." (atau ". $j ." dan ". $i .") karena ". $one ." + ". $two ." = ". $total ."<br/>";
            }
        }
    }
}

$data = [3, 1, 5, 7, 5, 9];
$sum = 10;
findTwoSum($data, $sum);
?>
