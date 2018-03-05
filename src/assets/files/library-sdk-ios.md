# Latest Version: 1.0

The goal of Library SDK is to simplify the design and workflow from current layered app solution . The Library SDK will be integrated into the APP as a framework, all operations are in the same APP that could improve user experience. In the whole measurement system, the Library SDK should be a stateless module, without remembering any history or settings. The caller is responsible for maintain the settings and state.


# Similar to Layered App, its spec as follows:

## Support Device

  BP3L、BP5、BP7、BPTRACK、PO3、BG5、HS4、HS4S、THV3、AM3S、AM4

# Feature List

Add a Device

    The caller app asks the layered app to add a new device with a specific device model; once added, the layered app sends back the new device's MAC ID to the caller app.

Measurement

    The caller app asks the layered app to do a new measurement; once finished, the layered app sends back the measurement result. 

Sync Offline Results

    The layered app can read offline records from a measurement device, such as BG5, BG Track, and send back to result list. 
     
Customization

    When needed, show a splash screen with caller app's brand.


# Parameter Type Introduction
devicemodel

    Different Numbers represent different iHealth devices.

    typedef NS_ENUM(NSUInteger, IHLDeviceType) {
        
        IHLDeviceType_Unknown = 0,
        IHLDeviceType_BP5,
        IHLDeviceType_BP3L,
        IHLDeviceType_BPTRACK,
        IHLDeviceType_BP7S,
        IHLDeviceType_PO3,
        IHLDeviceType_BG5,
        IHLDeviceType_HS4,
        IHLDeviceType_HS4S,
        IHLDeviceType_THV3,
        IHLDeviceType_AM3S,
        IHLDeviceType_AM4,
        IHLDeviceType_Max
     };

 
operation type(command)

     Different types of operations

     typedef NS_ENUM(NSUInteger, IHLAction) {

      IHLActionUnknown = 0,
      IHLActionMeasureData,      //measure data(NA for KN550BT/BP7S)
      IHLActionAddDevice,        //add device only(scan device and return mac address)
      IHLActionSyncData,         //sync history data(NA for BP3L)
      IHLActionSyncMeasure,      //sync history data + measure data(NA for KN550BT/BP7S)
      IHLActionMax                   //
    };

device add type

     typedef NS_ENUM(NSUInteger, IHLAddDeviceType) {

       IHLAddDeviceUnknown = 0,
       IHLAddDeviceWithScan,//scan
       IHLAddDeviceWithQR,//Qr code
       IHLAddDeviceWithMAC,//mac address
       IHLAddDeviceMax
     };


unit type

      typedef NS_ENUM(NSUInteger, IHLVitalUnit) {

        IHLUnitNA = 0,
        IHLBGUnitMMOLL,    //0 mmol/L
        IHLBGUnitMGDL,         //1 mg/dL
        IHLBPUnitMMHG,         //2 mmHg
        IHLBPUnitKPA,          //3 Kpa
        IHLWeightUnitKG,       //4 kg
        IHLWeightUnitLBS,      //5 lbs
        IHLWeightUnitSTONE,       //6 st
        IHLThermoUnitC,            //7 celsius
        IHLThermoUnitF,            //8 fahrenheit
        IHLAMUnitMile,             //9 mile
        IHLAMUnitKilometer,        //10 kilometer
        IHLUnitMax
      };

result status of each operation

        typedef NS_ENUM(NSUInteger, IHLResultStatus) {

           IHLResultNA = 0,
           IHLResultSuccess,
           IHLResultFailed,
           IHLResultCanceled,
        };


## Functional Spec

In general, invoke the Library SDK with IHLRequestModel and get the result with IHLResponseModel.


### Input params structure

      @interface IHLRequestModel : NSObject

      @property (strong, nonatomic) UIImage* logoImage;

      @property (strong, nonatomic) UIColor* navigationBarColor;

      @property (strong, nonatomic) UIColor* buttonColor;

      @property (assign, nonatomic, readonly) IHLAction action;//request action type

      @property (assign, nonatomic, readonly) IHLDeviceType deviceType;//device type

      @property (copy, nonatomic, readonly) NSString *mac;//device mac address(if you know the mac address, and want to measure/sync directly)

      @property (assign, nonatomic, readonly) IHLVitalUnit unit;//unit type(NA for PO3)

      Properties relationship
     
      R is short for "required". NR is short for "not required"

                    measure             sync                add device
     action          R                   R                   R
     deviceType      R                   R                   R
     mac             R(Only AddTypeMac)  R(Only AddTypeMac)  NR
     unit            R(except PO3)       R(except PO3)       NR
     addtype         R                   R                   R
     godCodeR        R(only BG5)         NR                  NR




### validate your app to use Library App

       @param clientID your clientID
      
       @param appSecret your appSecret

       @param userAccount your userAccount

       @param userValideResultBlock a callback block to return you authen result

       + (void)userValidateWithClientID:(NSString*)clientID  appSecret:(NSString *)appSecret userAcount:(NSString*)userAccount resultBlock:(IHLValideResult)userValideResultBlock;



### config request parameters, you can only use this method to initiate this class instance


        @param action request action
        @param addMethod add device type
        @param deviceType device type
        @param macAddress mac address if you know
        @param unit measure/sync unit, NA for PO3
        @param godCode GOD code for BG
        @param popAlertView should confirm popup alert view when adding devices
        @param userID user ID for AM
        @param sex user sex for AM
        @param age user age for AM
        @param height user height for AM
        @param weight user weight for AM
        @param flag swimFlag for AM

        + (void)configModelWithAction:(IHLAction)action addMethod:(IHLAddDeviceType)addMethod forDevice:(IHLDeviceType)deviceType withMac:(NSString*)macAddress unit:(IHLVitalUnit)unit godCodeIfBG:(NSString*)godCode shouldPopAlertView:(BOOL)popAlertView;




### use this method to get this class instance

       @return this class instance

       + (instancetype)sharedInstance;



### request operation immediately, it will present a page

      @param delegate specify a instance which comply IHLRequestDelegate protocol, to get result
      @param animation show page with animation or not

      - (void)requestOpertationWithDelegate:(id<IHLRequestDelegate>)delegate withAnimation:(BOOL)animation;



## Output params format


      #define RESULT_KEY_SYSTOLIC        @"systolic"       // integer
      #define RESULT_KEY_DIASTOLIC       @"diastolic"      // integer
      #define RESULT_KEY_ARRHYTHMIA      @"arrhythmia"     // 0/1
      #define RESULT_KEY_Date            @"measured_at"    // string, UTC time, in format yyyy-MM-dd HH:mm:ss
      #define RESULT_BLOOD_GLUCOSE       @"blood_glucose"  // float
      #define RESULT_KEY_TEMPERATURE     @"temperature"
      #define RESULT_KEY_WEIGHT          @"weight"         // float

      #define RESULT_KEY_OXYGEN_SAT      @"oxygen_saturation"      // integer
      #define RESULT_KEY_PERFUSION_INDEX @"perfusion_index"        // float
      #define RESULT_KEY_HEART_RATE      @"heart_rate"


### we will retrun result with this model

      @interface IHLResponseModel : NSObject

      @property (assign, nonatomic) IHLAction action;//request action
      @property (assign, nonatomic) IHLDeviceType deviceType;//request device type
      @property (copy,nonatomic) NSString* mac;//request mac address or mac address which we scaned
      @property (assign,nonatomic) IHLVitalUnit unit;//request unit
      @property (assign, nonatomic) IHLAddDeviceType deviceAddType;//request add type
      @property (copy,nonatomic) NSString* errorReason;//operation error reason(if error)
      @property (assign,nonatomic) IHLResultStatus addStatus;//add device status
      @property (assign,nonatomic) IHLResultStatus syncStatus;//sync data status
      @property (assign,nonatomic) IHLResultStatus measureStatus;//measure status
      @property (strong,nonatomic) NSArray* syncResult;//sync result
      @property (strong,nonatomic) NSArray* measureResult;//measure result

### Color customization，You can customize the App colors you use

Pass in the parameter Key

      #define SDKCOLOR_KEY_NAVIGATION_BAR      @"NavigationBarColor"       UIColor//Navigation bar: navigationBar.barTintColor
      #define SDKCOLOR_KEY_TITLE               @"TitleColor"               UIColor//Navigation Title
      #define SDKCOLOR_KEY_BACKBUTTON          @"BackButtonColor"          UIColor//Navigation Back
      #define SDKCOLOR_KEY_BRIGHTBUTTON        @"RightButtonColor"         UIColor//Navigation RightButton
      #define SDKCOLOR_KEY_SRTARTBUTTON        @"StartButtonColor"         UIColor//StartButton
      #define SDKCOLOR_KEY_THEME               @"ThemeColor"               UIColor//Theme Display Button
      #define SDKCOLOR_KEY_LOGOIMAGE           @"LogoImage"                UIImage//logo Image

Example：

    NSDictionary*myDic=[[NSDictionary alloc] initWithObjectsAndKeys:[UIColor yellowColor],SDKCOLOR_KEY_NAVIGATION_BAR, nil];
    
    [IHLRequestModel sharedInstance].setColorDic=myDic;


# Integration on iOS


1. you cannot use iOS simulator to debug, please use real iPhone/iPad.

2. import iHealthLabrarySDK.framework to your project, make sure this framework file is in 'copy bundle resources', in project 'Build Phases'.

3. the way to call ihealth library and receive data 

## call SDK library to get data

      - (void)callLibraryAppViewController{ 

      [IHLRequestModel configModelWithAction:IHLActionMeasureData addMethod:IHLAddDeviceWithScan forDevice:IHLDeviceType_BG5 withMac:@"" unit:IHLBGUnitMMOLL godCodeIfBG:@"02396264396214322D1200A02B2A638EDA14428894E61901238305E712BC" shouldPopAlertView:YES ];

      [IHLRequestModel sharedInstance].logoImage = [UIImage imageNamed:@"AppLogo"];//optional
      [[IHLRequestModel sharedInstance] requestOpertationWithDelegate:self withAnimation:YES];

      }

## data return from SDK library

     deleagte IHLResultDelegate

     - (void)responseForLibraryApp:(IHLResponseModel*)response{
      do custom operation with response
     }
## Whether or not the result is shown


    blindResult

   YES：No measurement results are shown   NO：Display measurement results

Example：

[IHLRequestModel sharedInstance].blindResult = YES;

## config plist file:

1)  add ***Camera Usage Description*** (for QR code scan)

2)  add ***Supported external accessory*** protocols:

     "com.jiuan.BPV20","com.jiuan.BWSV01","com.jiuan.BPV23","com.jiuan.BGV31"


## add ***-ObjC*** to ***Other Linker Flags*** in project settings

## enable ***External accessory communication*** and ***Use Bluetooth LE accessories*** items in ***Background Modes*** in project Capabilities.