# Feature List

Add a Device

```markdown
The caller app asks the layered app to add a new device with a specific device model; once added, the layered app sends back the new device's MAC ID to the caller app.
```
Measurement

```markdown
The caller app asks the layered app to do a new measurement; once finished, the layered app sends back the measurement result. 
```
Sync Offline Results

```markdown
The layered app can read offline records from a measurement device, such as BG5, BG Track, and send back to result list. 
```    

# Parameter Type Introduction

devicemodel

```markdown
    Different Numbers represent different iHealth devices.

    typedef enum {
    HealthDeviceType_BP5 = 100,  
    HealthDeviceType_BP3L = 101,
    HealthDeviceType_BPTRACK = 102，
    HealthDeviceType_BP7S = 103, 
    HealthDeviceType_BP7 = 104, 
    HealthDeviceType_AM3S = 200,
    HealthDeviceType_AM4 = 201,
    HealthDeviceType_PO3 = 300,
    HealthDeviceType_BG5 = 400,
    HealthDeviceType_BG1 = 402,
    HealthDeviceType_HS4 = 500, 
    HealthDeviceType_HS4S = 501,
    HealthDeviceType_HS2 = 502,
    HealthDeviceType_THV3 = 600,
    } HealthDeviceType;
```
cmd

```markdown  
    Different types of operations，

    typedef enum {
    ActionMeasureData = 0,          //Only measuring operations    only BP3L BP5 PO3 BG5 HS4 HS4S THV3 supprt this function
    ActionAddDevice= 1,             //Only search device operation    all device  support this function
    ActionSyncData = 2,             //Only synchronize device history data operation  except BP3L  other device support this function
    ActionAddMeasure = 3,           //All scanned devices will be listed and measured according to the equipment you selected   only BP3L BP5 PO3 BG5 HS4 HS4S THV3 supprt this function
    ActionAddSync = 4,              //All scanned devices will be listed and synchronize device history data according to the equipment you selected    except BP3L  other device support this function
    ActionAddSyncMeasure = 5,      //It will list all the scanned devices and synchronize historical data according to the device you choose, and then measure after synchronization    only  BP5 PO3 BG5 HS4 HS4S THV3 supprt this function
    ActionSyncMeasure = 6,        //Synchronize historical data and measure after synchronization   only  BP5 PO3 BG5 HS4 HS4S THV3 supprt this function
    ActionOther                   
    } LayeredAction;
```
addtype

```markdown
    Search for two ways to get the ihealth device MAC. ActionAddDeviceWithScan represents the MAC using a bluetooth scan, and ActionAddDeviceWithQR represents synchronous qr code scanning for MAC. 
    typedef enum {
    ActionAddDeviceWithScan = 0,    //scan
    ActionAddDeviceWithQR= 1        //Qr code
    } LayeredAddType;
``` 
    
codetype

```markdown
    typedef enum {
    BGQRCode = 0,
    BGCodeOther = 1 
    } LayeredBGCodeType; 
```
unit

```markdown
    Sets the ihealth device data unit

    typedef enum {
    BGUnitMMOLL = 0,            // mmol/L
    BGUnitMGDL = 1,             // mg/dL
    BPUnitMMHG = 2,             // mmHg
    BPUnitKPA = 3，             // Kpa
    WeightUnitKG = 4,		// kg
    WeightUnitLBS = 5，         // lbs
    WeightUnitSTONE = 6，      // st
    ThermometerUnitC=7，       //Celsius
    ThermometerUnitF=8，       //Degrees Fahrenheit  
    Mile=9，                   //mile    
    Kilometre                  //Kilometre
    } VitalUnit;
```
sex

```markdown
    User sex

    typedef enum {
    UserSex_Female = 0,
    UserSex_Male= 1,    
    } UserSex;
```

swim

```markdown
    Swimming function switch   

    typedef enum {
    SwimFunction_OFF = 0,
    SwimFunction_ON= 1,    
    } SwimSwitch;
```

 
status

```markdown
    Invoke different device operations to return the operating state    

    typedef NS_ENUM(NSInteger, ActionStatus) {
    /// Placeholder
    ActionStatusUnkown = -1,
    /// Only available for ActionMeasureData,ActionAddDevice and ActionSyncData
    ActionSucess = 0,
    /// Only available for ActionMeasureData,ActionAddDevice and ActionSyncData
    ActionFail = 1,
    /// Only available for ActionMeasureData,ActionAddDevice and ActionSyncData
    ActionCancel = 2,
    
    ActionStatusAddCancelMeasureNP          = 0x0f0f | ((BaseActionCancel << StatusPositionAdd) | (BaseActionNP << StatusPositionMeasure)),//16175
    ActionStatusAddSuccessMeasureSuccess    = 0x0f0f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionSuccess << StatusPositionMeasure)),//3855
    ActionStatusAddSuccessMeasureFail       = 0x0f0f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionFail << StatusPositionMeasure)),//7951
    ActionStatusAddSuccessMeasureCancel     = 0x0f0f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionCancel << StatusPositionMeasure)),//12047
    
    ActionStatusAddCancelSyncNP             = 0xf00f | ((BaseActionCancel << StatusPositionAdd) | (BaseActionNP << StatusPositionSync)),//62255
    ActionStatusAddSuccesSyncSuccess        = 0xf00f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionSuccess << StatusPositionSync)),//61455
    ActionStatusAddSuccessSyncFail          = 0xf00f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionFail << StatusPositionSync)),//61711
    ActionStatusAddSuccessSyncCancel        = 0xf00f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionCancel << StatusPositionSync)),//61967
    
    ActionStatusAddCancelSyncNPMeasureNP            = 0x000f | ((BaseActionCancel << StatusPositionAdd) | (BaseActionNP << StatusPositionSync) | (BaseActionNP << StatusPositionMeasure)),//13103
    ActionStatusAddSuccessSyncFailMeasureNP         = 0x000f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionFail << StatusPositionSync) | (BaseActionNP << StatusPositionMeasure)),//12559
    ActionStatusAddSuccessSyncCancelMeasureNP       = 0x000f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionCancel << StatusPositionSync) | (BaseActionNP << StatusPositionMeasure)),//12815
    ActionStatusAddSuccessSyncSuccessMeasureCancel  = 0x000f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionSuccess << StatusPositionSync) | (BaseActionCancel << StatusPositionMeasure)),//8207
    ActionStatusAddSuccessSyncSuccessMeasureFail    = 0x000f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionSuccess << StatusPositionSync) | (BaseActionFail << StatusPositionMeasure)),//4111
    ActionStatusAddSuccessSyncSuccessMeasureSuccess = 0x000f | ((BaseActionSuccess << StatusPositionAdd) | (BaseActionSuccess << StatusPositionSync) | (BaseActionSuccess << StatusPositionMeasure)),//15
    
    ActionStatusSyncCancelMeasureNP         = 0x00ff | ((BaseActionCancel << StatusPositionSync) | (BaseActionNP << StatusPositionMeasure)),//13055
    ActionStatusSyncFailMeasureNP           = 0x00ff | ((BaseActionFail << StatusPositionSync) | (BaseActionNP << StatusPositionMeasure)),//12799
    ActionStatusSyncSuccessMeasureCancel    = 0x00ff | ((BaseActionSuccess << StatusPositionSync) | (BaseActionCancel << StatusPositionMeasure)),//8447
    ActionStatusSyncSuccessMeasureFail      = 0x00ff | ((BaseActionSuccess << StatusPositionSync) | (BaseActionFail << StatusPositionMeasure)),//4351
    ActionStatusSyncSuccessMeasureSuccess   = 0x00ff | ((BaseActionSuccess << StatusPositionSync) | (BaseActionSuccess << StatusPositionMeasure)),//255
    }ActionStatus；
```

ver
```markdown
Layer App protocol version number
```
appid

```markdown
The package name that represents the app on the android system,the Bundle identifier that represents the app in the ios system
```

scheme

```markdown
The CALLER_APP_SCHEME value when callback data.
```

popflag

```markdown
Scan to see whether to pop up a prompt when connecting to MAC,0: no popup prompt box 1: pop-up prompt box
```

userid

```markdown
The user's unique ID for the binding of AM devices，Assignment is a numeric type，ranging from 1 – 2147483647.
```

age

```markdown
User age ，Assignment is a numeric type
```

height

```markdown
User height，Assignment is a numeric type，The units are centimeters，ranging from 1-255
```

weight

```markdown
User weight，Assignment is a numeric type，The units are kg，ranging from 1-255
```


### Keys

```markdown    
    All the keys that return the data in the results   

    #define RESULT_KEY_SYSTOLIC         @"systolic"         // integer
    #define RESULT_KEY_DIASTOLIC        @"diastolic" 	// integer
    #define RESULT_KEY_ARRHYTHMIA       @"arrhythmia"	// 0/1
    #define RESULT_KEY_MEASURED_AT 	@"measured_at"      // string, UTC time, in format yyyy-MM-dd HH:mm:ss
    #define RESULT_BLOOD_GLUCOSE        @"blood_glucose"  // float
    #define RESULT_KEY_WEIGHT  	      @"weight"         // float
    #define RESULT_KEY_OXYGEN_SAT       @"oxygen_saturation"     // integer  
    #define RESULT_KEY_PERFUSION_INDEX  @"perfusion_index"       // float
    #define RESULT_KEY_HEART_RATE       @"heart_rate"            // integer
    #define RESULT_KEY_TEMPERATURE      @"temperature"           // float
```

# Functional Spec

  In general, the URL scheme to invoke the layered app is:

```markdown
    LAYERED_APP_SCHEME://?appid=AppID&cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC_ADDR&unit=VitalUnit&ver=100&scheme=CALLER_APP_SCHEME
   
    Please note that:

     For all Android calls, parameter "appid" is mandatary, and the value of the appid parameter is client app's bundle ID.        This parameter is not needed for iOS calls;
    If there are more URL parameters than the ones defined in this spec, the layered app should simply return them in original format, with value untouched.
    URL input parameters are either uppercase or lowercase，the layered app should simply return them in original format  with android,in lowercase format  with iOS, with value untouched. 
```

## Dynamic Callback URL

   For white listed apps, they can also use dynamic URLs defined in the query parameter. 

```markdown
     For example:
   
     LAYERED_APP_SCHEME://?cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&callerurl=my-dynamic-  url-0x7765://

     To support dynamic URL, instead of using a specific URL in the AppWhiteList.plist file, "*" is used. For example:

    <key>com.ihealth.nextapp</key>
    <string>*</string>
```

In this way, when layered app receives a call from a white listed app with dynamic URL, callbacks will be sent to the URL defined in the "callurl" parameter from the qurey string. For example, in query:

```markdown
    LAYERED_APP_SCHEME://?cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&callerurl=my-dynamic-url-0x7765://
    The callback URL will be "my-dynamic-url-0x7765://". 
```

## Add a Device

Support Device

```markdown
    BP3L  BP5  BPTRACK  BP7S  BP7  AM3S  AM4  PO3  BG5  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=1&addtype=LayeredAddType&devicemodel=HealthDeviceType&ver=100&popflag=[0|1]&scheme=CALLER_APP_SCHEME

    Example: 
    a bluetooth scan for the MAC address of BP5
    LAYERED_APP_SCHEME://?appid=AppID&cmd=1&addtype=0&devicemodel=100&ver=100&popflag=0&scheme=CALLER_APP_SCHEME
 
    iOS

    LAYERED_APP_SCHEME://?cmd=1&addtype=LayeredAddType&devicemodel=HealthDeviceType&ver=100&popflag=[0|1]&scheme=CALLER_APP_SCHEME
   
    Example: 
    a bluetooth scan for the MAC address of BP5
    LAYERED_APP_SCHEME://?cmd=1&addtype=0&devicemodel=100&ver=100&popflag=0&scheme=CALLER_APP_SCHEME

    where, devicemodel is defined above in Parameter Type Introduction.popflag this parameter when adding the device, 0: no pop-up prompt 1: pop-up prompt

    If the device you want to add is AM3 or AM4. Url：

    ihealth-layer://?cmd=LayeredAction&devicemodel=200|201&addtype=[0|1]&userid=1111&age=1&sex=UserSex&height=11&weight=11&swim=SwimSwitch&unit=[9|10]&ver=100&scheme=CALLER_APP_SCHEME
```

Logic

The Layered App should support two ways to add a new device:

```markdown
    Add a new device by searching for connected Bluetooth devices (done)
    Add a new device by scanning the QR code (mac address) on the device or box.
    If the barcode just represents the MAC ID, or in format "ID:MAC", just use the mac ID;
    If the barcode is in format "DEVICE_MODEL_STRING:MAC":
    Verify the DEVICE_MODEL_STRING against the requested devicemodel, if failed, return error. The DEVICE_MODEL_STRING is actually device model, such as BP3L、BP5、BP7S、KN550BT、PO3、BG5、HS4、HS4S、HS2、FDIR-V3、AM3S、AM4.
    Otherwise return the MAC ID.
```

Callback
 
```markdown   
    sucess:    

    CALLER_APP_SCHEME://?cmd=1&addtype=LayeredAddType&devicemodel=HealthDeviceType&status=0&mac=MAC_ADDR&ver=100

    cancel:    

    CALLER_APP_SCHEME://?cmd=1&addtype=LayeredAddType&devicemodel=HealthDeviceType&status=2&ver=100 
    
    fail:

    CALLER_APP_SCHEME://?cmd=1&addtype=LayeredAddType&devicemodel=HealthDeviceType&status=1&ver=100&reason=ERROR_DETAILS
```

Errors

```markdown
    When in search mode, no paired device can be found, return error;
    When in QR code mode, if the DEVICE_MODEL prefix doesn't match requested device model, return error;
    When in QR code mode, if the MAC ID doesn't match mac address' format (12 chars, 0-9 or A-F), return error.
    If the device you want to add is AM3 or AM4，callbackurl incoming： userid、weight、height、sex、swim、age
```

## Measurement

Support Device

```markdown
    BP3L  BP5  BP7  PO3  BG5  BG1  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=0&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&scheme=CALLER_APP_SCHEME
   
    Example: 
    BP5 for measurement
    LAYERED_APP_SCHEME://?appid=AppID&cmd=0&devicemodel=100&mac=004D3208D2F4&unit=0&ver=100&scheme=CALLER_APP_SCHEME

    iOS

    LAYERED_APP_SCHEME://?cmd=0&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&scheme=CALLER_APP_SCHEME

    Example: 
    BP5 for measurement
    LAYERED_APP_SCHEME://?appid=AppID&cmd=0&devicemodel=100&mac=004D3208D2F4&unit=0&ver=100&scheme=CALLER_APP_SCHEME

    where, devicemodel and unit are defined in Parameter Type Introduction.

    If the product is a BG5 measurement，Increase the incoming parameters：codeType=LayeredBGCodeType&code=codestring，If you are using a BGCode , please by scanning qr code for the incoming string, the layer app BG support only blood measurement.

```

Callback

```markdown    
    sucess：

    CALLER_APP_SCHEME://?cmd=0&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&status=0&result=[{systolic:10,diastolic:10, heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}]

    cancel：    

    CALLER_APP_SCHEME://?cmd=0&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&status=2&reason=ERROR_CANCEL 

    fail：

    CALLER_APP_SCHEME://?cmd=0&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&status=1&reason=errorcode  # errorcode：ERROR-devicetype-errorCode
```

When it's successful, the callback result keys are defined in Parameter Type Introduction. 
The values of the returned results should be in the unit specified in the caller URL.

## Sync Offline Results

Support Device

```markdown
    BP5  BPTRACK  BP7S  BP7  AM3S  AM4  PO3  BG5  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=2&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&scheme=CALLER_APP_SCHEME
 
    iOS

    LAYERED_APP_SCHEME://?cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&scheme=CALLER_APP_SCHEME


    If the device you want to add is AM3 or AM4.Url：

    ihealth-layer://?cmd=2&devicemodel=200|201&mac=MAC&userid=1111&age=1&sex=UserSex&height=11&weight=11&swim=[0|1]&unit=[9|10]&ver=100&scheme=CALLER_APP_SCHEME

    where, devicemodel and unit are defined in Parameter Type Introduction. 
```

Callback

```markdown
      sucess：

      CALLER_APP_SCHEME://?status=0&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&result=[{systolic:10,diastolic:10, heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, {}, {}, ...]&ver=100

     cancel
  
     CALLER_APP_SCHEME://?status=2&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit # 2 is user canceled this action&ver=100

     fail  

     CALLER_APP_SCHEME://?status=1&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&reason=ERROR_DETAILS&ver=100
```
When it's successful, the the callback returns all values in one encoded, flattened json string – no indentation, no new lines. The limit of the URL is 20K for iOS.



The unflattened result look like:

```markdown
     {
	result: [
		{key1 : val1, key: val2, ... , measured_at: measurement_timestamp},
		{key1 : val1, key: val2, ... , measured_at: measurement_timestamp},
		{key1 : val1, key: val2, ... , measured_at: measurement_timestamp},
		{key1 : val1, key: val2, ... , measured_at: measurement_timestamp},
		...
	        ]
     }
```
Where key and val are defined same as previous section Measurement, with an additional key to record measurement time. 

If the product is  AM3S AM4 Sync Offline Results，Increase the incoming parameters：userid、weight、height、sex、swim、age

AM3S、AM4 callback RESULT_JSON：

```markdown   
      [
        {  
           time : 2017-1-1
           activedata : {
                      steps=1000,     
                      calories=1000
                       }
           sleepdata: {                   
                      sleeptime=100,        //unit：minutes
                      sleepefficiency=100    //0-100
                      }
           swimdata : {
                      swimtime=1000,     //unit：minutes
                      calories=1000
                    }
      ]
```
## Add a Device  and  Measurement    or  Add a Device  and  Sync Offline Results 

Support Device

```markdown
    Add a Device  and  Measurement

    BP3L  BP5  BP7  PO3  BG5  HS4  HS4S  HS2  THV3

    Add a Device  and  Sync Offline Results 
   
    BP5  BPTRACK  BP7S  BP7  AM3S  AM4  PO3  BG5  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=LayeredAction&devicemodel=HealthDeviceType&unit=VitalUnit&addtype=LayeredAddType&ver=100&scheme=CALLER_APP_SCHEME
 
    iOS

    LAYERED_APP_SCHEME://?cmd=LayeredAction&devicemodel=HealthDeviceType&unit=VitalUnit&addtype=LayeredAddType&ver=100&scheme=CALLER_APP_SCHEME


    where, cmd、addtype、devicemodel and unit are defined in "Parameter Type Introduction" section.
```

Callback

```markdown
      sucess：

      CALLER_APP_SCHEME://?status=0&cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&addtype=LayeredAddType&result=[{systolic:10,diastolic:10,heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, {}, {}, ...]&ver=100

     cancel
  
     CALLER_APP_SCHEME://?status=2&cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&addtype=LayeredAddType&ver=100 

     fail  

     CALLER_APP_SCHEME://?status=1&cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&addtype=LayeredAddType&reason=ERROR_DETAILS&ver=100

```


## Add a Device  and  Measurement  and  Sync Offline Results 

Support Device

```markdown
    BP5  BP7  PO3  BG5  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=ActionAddSyncMeasure&devicemodel=HealthDeviceType&unit=VitalUnit&addtype=LayeredAddType&ver=100&scheme=CALLER_APP_SCHEME
 
    iOS

    LAYERED_APP_SCHEME://?cmd=ActionAddSyncMeasure&devicemodel=HealthDeviceType&unit=VitalUnit&addtype=LayeredAddType&ver=100&scheme=CALLER_APP_SCHEME

    where, cmd、addtype、devicemodel and unit are defined in "Parameter Type Introduction" section.
```

Callback

```markdown
      sucess：

      CALLER_APP_SCHEME://?status=0&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit &addtype=LayeredAddType&ver=100&result={
      measureresult:(
                    {systolic:10,diastolic:10,heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, 
                     {}, {}, ...)
      syncresult:(
                    {systolic:10,diastolic:10,heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, 
                     {}, {}, ...)

      }

     cancel
  
     CALLER_APP_SCHEME://?status=2&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&addtype=LayeredAddType&ver=100

     fail  

     CALLER_APP_SCHEME://?status=1&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit &addtype=LayeredAddType&reason=ERROR_DETAILS&ver=100
```

When it's successful, the the callback returns all values in one encoded, flattened json string – no indentation, no new lines. The limit of the URL is 20K for iOS.

##  Measurement  and  Sync Offline Results 

Support Device

```markdown
    BP5  BP7  PO3  BG5  HS4  HS4S  HS2  THV3
```

URL scheme

```markdown
    Android

    LAYERED_APP_SCHEME://?appid=AppID&cmd=ActionAddSyncMeasure&devicemodel=HealthDeviceType&unit=VitalUnit&mac=MAC&ver=100&scheme=CALLER_APP_SCHEME
 
    iOS

    LAYERED_APP_SCHEME://?cmd=LayeredAction&devicemodel=HealthDeviceType&unit=VitalUnit&mac=MAC&ver=100&scheme=CALLER_APP_SCHEME


    where, cmd、addtype、devicemodel and unit are defined in "Parameter Type Introduction" section.
```

Callback

```markdown
      sucess：

      CALLER_APP_SCHEME://?status=0&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100&result={
      measureresult:(
                    {systolic:10,diastolic:10,heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, 
                     {}, {}, ...)
      syncresult:(
                    {systolic:10,diastolic:10,heart_rate:10,arrhythmia:0,measured_at:2017-10-10 10:10:10}, 
                     {}, {}, ...)

      }

     cancel
  
     CALLER_APP_SCHEME://?status=2&cmd=LayeredAction&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&ver=100 

     fail  

     CALLER_APP_SCHEME://?status=1&cmd=1&devicemodel=HealthDeviceType&mac=MAC&unit=VitalUnit&reason=ERROR_DETAILS&ver=100
```

When it's successful, the the callback returns all values in one encoded, flattened json string – no indentation, no new lines. The limit of the URL is 20K for iOS.

