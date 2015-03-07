<?php

class ApiController extends Zend_Controller_Action
{

    public function init()
    {
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function indexAction()
    {
        $data = array('version' => '0.1');
 
	echo Zend_Json::encode($data);
    }
    
    public function stateAction()
    {
        $data = array('level' => 1);
 
	echo Zend_Json::encode($data);
    }
    
    public function peopleAction()
    {
        $data = array();
        
        $fh = fopen("/tmp/people.csv", "r");

        while (!feof($fh) ) {

            $line_of_text = fgetcsv($fh, 1024);
            

            $data[] = array("latitude"=> $line_of_text[0],
                "longitude"=> $line_of_text[1]);

        }

        fclose($fh);
 
	echo Zend_Json::encode($data);
    }
    
    public function reportAction()
    {
        $body = $this->getRequest()->getRawBody();
        $data = Zend_Json::decode($body);
        
        $fh = fopen("/tmp/people.csv", "a+");
        fputcsv($fh , array($data["latitude"], $data["longitude"], $data["phone"]));
        close($fh);
        
        echo Zend_Json::encode(array('id' => rand(1, 100)));
        
    }
    
    public function areasAction()
    {
        $data = array(
            array("latitude"=> "51.5254274",
                "longitude"=> "-0.1392217")
        );
 
	echo Zend_Json::encode($data);
    }
}
