var NewRequestPage = function(){
  this.serviceTypeDropdown = element(by.id('ctl00_RightPlaceHolder_ddlSIMType'));
  this.toStateDropdown = element(by.id('ctl00_RightPlaceHolder_ddlToState'));
  this.proceedButton = element(by.id('ctl00_RightPlaceHolder_btnProceed'));
  
  this.firstSim = element(by.id('ctl00_RightPlaceHolder_simSelector_grdSIMList_ctl00_ctl04_ClientSelectColumnSelectCheckBox'));
  this.simListProceedButton = element(by.id('ctl00_RightPlaceHolder_btnActivate'));
  
  this.dataPlanDropdown = element(by.id('ctl00_RightPlaceHolder_ddlDataPlan'));
  this.smsPlanDropdown = element(by.id('ctl00_RightPlaceHolder_ddlSMSPlan'));
  
  // SIM FEATURES PAGE
  this.simFeaturesTable = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated'));
  // ---- SIM FEATURES -----
  this.apnC1Feature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_0'));
  this.apnC2Feature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_1'));  
  this.apnGridFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_2'));
  this.apnSlogicFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_3'));
  this.apnSmartDriveFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_4'));
  this.apnDynamicFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_5'));  
  this.apnPrivateStaticFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_6'));
  this.apnPublicStaticFeature = element(by.id('ctl00_RightPlaceHolder_UxSimTypeFeatureGroups_ckbxListAPN/IPRelated_7'));
  // ---- END SIM FEATURES -----
  this.simFeaturesProceedButton = element(by.id('ctl00_RightPlaceHolder_lbBottomSave'));
  
  // DEVICE CONFIRMATION PAGE
  this.confirmationEmailRadio = element(by.id('ctl00_RightPlaceHolder_rbMailAddress')); 
  this.confirmationEmailText = element(by.id('ctl00_RightPlaceHolder_txtEmailAddress'));
  this.confirmationButton = element(by.id('ctl00_RightPlaceHolder_btnSubmit'));
  
  // ACTIVATION CONFIRMATION PAGE
  this.trackingNumberLink = element(by.id('ctl00_RightPlaceHolder_hlRow2'));
}
module.exports = new NewRequestPage();


