<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        
    }

    public function indexAction()
    {
        $data = array('test' => 1);
 
	echo Zend_Json::encode($data);	
 
	$this->_helper->viewRenderer->setNoRender(true);
    }
    
    public function stateAction()
    {
        
    }
    
    public function peopleAction()
    {
        
    }
    
    public function reportAction()
    {
        
    }


}

