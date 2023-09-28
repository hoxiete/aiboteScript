const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
let token = {
    "refresh_token": "25.66fcb807d94f5656af4254b0d08b520e.315360000.2011189735.282335-40097980",
    "expires_in": 2592000,
    "session_key": "9mzdD0aHf2O+pOZj6TJl6l+8oKQSXZ4n4a3HpVc9pY+MuD1eWjZJSLrokWvYBTGT7PvKA/ovxuGXhgTar6HV4kvsZtxb3A==",
    "access_token": "24.4b95b889a78744f739a599afc207b72c.2592000.1698421735.282335-40097980",
    "scope": "public vis-ocr_ocr brain_ocr_scope brain_ocr_general brain_ocr_general_basic vis-ocr_business_license brain_ocr_webimage brain_all_scope brain_ocr_idcard brain_ocr_driving_license brain_ocr_vehicle_license vis-ocr_plate_number brain_solution brain_ocr_plate_number brain_ocr_accurate brain_ocr_accurate_basic brain_ocr_receipt brain_ocr_business_license brain_solution_iocr brain_qrcode brain_ocr_handwriting brain_ocr_passport brain_ocr_vat_invoice brain_numbers brain_ocr_business_card brain_ocr_train_ticket brain_ocr_taxi_receipt vis-ocr_household_register vis-ocr_vis-classify_birth_certificate vis-ocr_台湾通行证 vis-ocr_港澳通行证 vis-ocr_机动车购车发票识别 vis-ocr_机动车检验合格证识别 vis-ocr_车辆vin码识别 vis-ocr_定额发票识别 vis-ocr_保单识别 vis-ocr_机打发票识别 vis-ocr_行程单识别 brain_ocr_vin brain_ocr_quota_invoice brain_ocr_birth_certificate brain_ocr_household_register brain_ocr_HK_Macau_pass brain_ocr_taiwan_pass brain_ocr_vehicle_invoice brain_ocr_vehicle_certificate brain_ocr_air_ticket brain_ocr_invoice brain_ocr_insurance_doc brain_formula brain_seal brain_ocr_facade brain_ocr_meter brain_doc_analysis brain_ocr_webimage_loc brain_bus_ticket brain_toll_invoice brain_ocr_medical_paper brain_ocr_doc_analysis_office brain_ferry_ticket brain_vat_invoice_verification brain_ocr_used_vehicle_invoice brain_ocr_medical_detail brain_vehicle_registration_certificate brain_ocr_online_taxi_itinerary brain_ocr_multi_idcard brain_ocr_mixed_multi_vehicle brain_ocr_weigth_note brain_ocr_ multiple_invoice brain_ocr_social_security_card brain_ocr_medical_report_detection brain_ocr_waybill brain_ocr_medical_summary brain_ocr_pen brain_ocr_brain_shopping_receipt brain_ocr_road_transport_certificate brain_form_table brain_ocr_remove_handwriting brain_ocr_ doc_crop_enhance brain_ocr_health_report brain_document_restructure brain_ocr_three_factors_verification brain_ocr_bank_receipt_new brain_ocr_marriage_certificate brain_ocr_hk_macau_taiwan_exitentrypermit brain_ocr_two_factors_verification wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test权限 vis-classify_flower lpq_开放 cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base smartapp_mapp_dev_manage iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi fake_face_detect_开放Scope vis-ocr_虚拟人物助理 idl-video_虚拟人物助理 smartapp_component smartapp_search_plugin avatar_video_test b2b_tp_openapi b2b_tp_openapi_online smartapp_gov_aladin_to_xcx",
    "session_secret": "27e764c5b307162e184a01fa1f779e94"
}
// let option = {region:[132, 237, 456, 283], mode:true}
let option = {region:[995, 366, 1321, 410], mode:true}
async function windowsMain(windowsBot){
    await windowsBot.initOcr("127.0.0.1");
    
    // let hwnd = await windowsBot.findWindow("ApplicationFrameWindow",null);
    let hwnd = await windowsBot.findWindow("Chrome_WidgetWin_1",null);
    console.log(hwnd)
    let question = await windowsBot.getWords(hwnd, option)
    console.log(question)
}