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
        $data = array(
            array("latitude"=> "51.5254274",
                "longitude"=> "-0.1392217")
        );
 
	echo Zend_Json::encode($data);
    }
    
    public function reportAction()
    {
        // will record data
    }
}
