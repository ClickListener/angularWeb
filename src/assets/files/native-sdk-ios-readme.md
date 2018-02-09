# iHealth Device Developer 


### Latest version: 2.1.5


### Documnentation
  This document describes how to use the iHealth Device SDK to accomplish the major operation: Connection Device, Online Measurement, Offline Measurement and iHealth Device Management.

### Authentication

    If you want to use the iHealth Device, you must first call authentication method, can call after certification by iHealth relevant methods of the device.

  Authentication method：

   -(void)commandSDKUserValidation:(HealthUser *)tempUser UserDeviceAccess:(DisposeSDKUserDeviceAccess)userDeviceAccess UserValidationSuccess:(DisposeSDKUserValidationSuccess)userValidationSuccess UserValidationReturn:(DisposeSDKUserValidationReturn)userValidationReturn DisposeErrorBlock:(DisposeSDKUserValidationErrorBlock)disposeValidationErrorBlock

### Support iHealth Device for iOS

    BP: 
    iHealth BP3    iHealth BP3L  iHealth BP5  iHealth BP7   iHealth BP7S   iHealth Continua BP iHealth KN550BT     iHealth ABI    iHealth ABPM   
    
    HS: 
    iHealth HS2  iHealth HS3    iHealth HS4   iHealth HS4S(Same with HS4)   iHealth HS5  iHealth HS6
    
    AM: 
    iHealth AM3    iHealth AM3S   iHealth AM4  
         
    BG: 
    iHealth BG1    iHealth BG3  iHealth BG5  iHealth BG5S
    
    PO: 
    iHealth PO3  iHealth PO3M
    
    Thermometer:
    
    THV3  TS28B


### Support Update iHealth Device for iOS

    AM3 AM3S AM4 HS4 HS4S BP5S ABPM HS2 BG5S

### Relevant files and frameworks
1、Import the following iHealthSDK files：   


    BP: 
    BPHeader.h、 BPMacroFile.h、BPCommandCache.h、BPController.h、BPDevice.h、 BP3.h、 BP3Controller.h、BP3L.h、 BP3LController.h、 BP5.h、BP5Controller.h、BP7.h、 BP7Controller.h、BP7S.h、BP7SController.h、 ABI.h, ABIController.h、BPContinua.h、BPContinuaController.h、ABPM.h、ABPMController.h、KN550BT.h、KN550BTController.h、BP5SRW.h、BP5SRWController.h、BPAlertSettingModel.h、BPAV10Device.h、BPBTLEDevice.h、BPBV10Device.h、BPLoopMeasureSettingModel.h
     、BPV24Device.h
    
	HS: 
	HSHeader.h、HSMacroFile.h、HS3.h、HS3Controller.h、HS4.h、HS4Controller.h、 HS5.h、HS5Controller.h、iHealthHS6.h、HS2.h、HS2Controller.h
	
	AM: 
	AMHeader.h、AMMacroFile.h、AM3.h、 AM3Controller.h、AM3S_V2.h、AM3SController_V2、AM4.h、AM4Controller.h、
	
	PO: 
	POHeader.h、POMacroFile.h、PO3.h、PO3Controller.h
	
    BG: 
    BGHeader.h、BGMacroFile.h、BGController.h、BGDevice.h、BG5.h、BG5Controller.h、BG1.h、BG1Controller.h、BG3.h、BG3Controller.h、BG5S.h、BG5SController.h
    
    Thermometer:
    THV3.h、THV3Controller.h、THV3Macro.h、TS28B.h、TS28BController.h、TS28BHeader.h
    
    Common:
	HealthUser.h、ConnectDeviceController.h、ScanDeviceController.h、HealthHeader.h

    Device Update：

    SDKUpdateDevice.h、DFUController.h、DFUDeviceFirmwareInfo.h、DFUHeader.h、DFUMacro.h、DFUServerFirmwareInfo.h

    Authentication：
     
    IHSDKCloudUser.h
	
	Library: iHealthSDK2.1.3.a
	
	supports iOS 8.0 and above.

2、Frameworks

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/public/iOS_ihealth_Frameworks_doc.png?raw=true)


3、Configuration


Add 2 new Item in ‘Supported external accessory protocols’: com.jiuan.BPV20, com.jiuan.P930, com.jiuan.BPV21,com.jiuan.BGV30,com.jiuan.BGV31,com.ihealth.sc221
￼



￼￼￼Add 1 new Item in ‘Required background modes’: App communicates with an accessory、 App communicates using CoreBluetooth

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/public/iOS_ihealth_Configuration_doc.png?raw=true)

### How to apply for SDK permissions

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/doc/Developer_Registration_Application_Instruction.md)

### How to use the iHealth SDK


 1. Operation procedure for BP3.

```Reference BP5```

 2. Operation procedure for BP5.

	a) Register plug-in device info: `BP5ConnectNoti`;

	b) Initialize controller classes:

	```BP5Controller *controller = [BP5Controller
shareBP5Controller];```

	c) Access control class instance after receive `BP5ConnectNoti`: 

	```NSArray *bpDeviceArray = [controller
getAllCurrentBP5Instace];```

	``` BP5 *bpInstance = [bpDeviceArray objectAtIndex: i];```

	d) Using ‘bpInstance’ call communication module of the device

 3. Operation procedure for BP7.

	```Reference BP5```


 4. Operation procedure for ABI.

	For ABI Mesure(both arm and leg)

	a) Register plug-in device info: `ABIConnectNoti`;
	b) Initializedcontrollerclass:

	```ABIController *controller = [ABIController
       shareABIController];```

	c) Access controller class instance after receive `ABIConnectNoti`:

	```ABI *bpInstance = [controller getCurrentABIInstace];```

	d) Using ‘bpInstance’ call communication module of the device.

	

	For Arm Mesure(arm only)

	a) Register plug-in device info: `ArmConnectNoti`; 

	b) Initializedcontrollerclass:

	```ABIController *controller = [ABIController
           shareABIController];```

	c) Access controller class instance after receive ArmConnectNoti:

	```ABI *bpInstance = [controller getCurrentArmInstance];```

	d) Using ‘bpInstance’ call communication module of the device.

 5. Operation procedure for BP3L.

	a) Register plug-in device info: `BP3LDiscover`;

	b) Start scan BP3L

	``` [[ScanDeviceController commandGetInstance]commandScanDeviceType:HealthDeviceType_BP3L] ```

	c) Register plug-in device info: `BP3LConnectFailed`、`BP3LConnectNoti`、	`BP3LDisConnectNoti`;

	d) Connect BP3L after receive `BP3LDiscover`

	``` [[ScanDeviceController commandGetInstance]commandStopScanDeviceType:HealthDeviceType_BP3L] ```


	``` [[ConnectDeviceController commandGetInstance]commandContectDeviceWithDeviceType:HealthDeviceType_BP3L andSerialNub:serialNub] ```

	e) Access control class instance after receive `BP3LConnectNoti`: 

	```BP3LController *controller = [BP3LController
shareBP3LController];```
	```  NSArray *bpDeviceArray = [controller
getAllCurrentBP3LInstace]; ```

	```BP3L *bpInstance = [bpDeviceArray objectAtIndex: i];```

	f) Using ‘bpInstance’ call communication module of the device

 6. Operation procedure for BP7S、KN550BT、KD926、

	```Reference BP3L```

 7. Operation procedure for HS3.

	```Reference BP5```
 8. Operation procedure for HS4.

	```Reference BP3L```

 9. Operation procedure for HS5.

	```Reference BP5```
 10. Operation procedure for AM3.

	```Reference BP3L```
 11. Operation procedure for AM3S.

	```Reference BP3L```

 12. Operation procedure for AM4.

	```Reference BP3L```

 13. Operation procedure for PO3.

	```Reference BP3L```

 14. Operation procedure for BG1.

   a) Initialization for BG1 (connected BG via sound
      jack)

       ```[[BG1Controller shareBG1Controller]initBGAudioModule];```
   b) Access control class instance after receive `BG1ConnectNoti`: 
    ```BG1 *bgInstance = [[BG1Controller shareBG1Controller] getCurrentBG1Instance];```

   c) Using ‘bgInstance’ to call the connection and BG test module of the device. BG test function must be called after the block of connection return.

 15. Operation procedure for BG5.

	```Reference BP5```



### BP Device change mothod


# Version Migration Guide For BP series API

### 1.Measurment

##### BP3

OLD:
```
-(void)commandStartMeasureWithUser:(NSString *)userID clientID:(NSString *)clientID clientSecret:(NSString *)clientSecret Authentication:(BlockUserAuthentication)disposeAuthenticationBlock pressure:(BlockPressure)pressure xiaoboWithHeart:(BlockXioaboWithHeart)xiaobo xiaoboNoHeart:(BlockXioaboNoHeart)xiaoboNoHeart  result:(BlockMesureResult)result errorBlock:(BlockError)error;
```
NEW:
```
-(void)commandStartMeasureWithZeroingState:(BlockZero)blockZeroState pressure:(BlockPressure)pressure waveletWithHeartbeat:(BlockWavelet)blockWaveletWithHeartbeat waveletWithoutHeartbeat:(BlockWavelet)blockWaveletWithoutHeartbeat result:(BlockMeasureResult)result errorBlock:(BlockError)error;
``` 
##### BP3L
OLD:
```
-(void)commandStartMeasureWithUser:(NSString *)userID clientID:(NSString *)clientID clientSecret:(NSString *)clientSecret Authentication:(BlockUserAuthentication)disposeAuthenticationBlock pressure:(BlockPressure)pressure xiaoboWithHeart:(BlockXioaboWithHeart)xiaobo xiaoboNoHeart:(BlockXioaboNoHeart)xiaoboNoHeart  result:(BlockMesureResult)result errorBlock:(BlockError)error;
```
NEW:
```
-(void)commandStartMeasureWithZeroingState:(BlockZero)blockZeroState pressure:(BlockPressure)pressure waveletWithHeartbeat:(BlockWavelet)blockWaveletWithHeartbeat waveletWithoutHeartbeat:(BlockWavelet)blockWaveletWithoutHeartbeat  result:(BlockMeasureResult)result errorBlock:(BlockError)error;
```

##### BP5
OLD:
```
-(void)commandStartMeasureWithUser:(NSString *)userID clientID:(NSString *)clientID clientSecret:(NSString *)clientSecret Authentication:(BlockUserAuthentication)disposeAuthenticationBlock pressure:(BlockPressure)pressure xiaoboWithHeart:(BlockXioaboWithHeart)xiaobo xiaoboNoHeart:(BlockXioaboNoHeart)xiaoboNoHeart  result:(BlockMesureResult)result errorBlock:(BlockError)error;
```
NEW:
```
-(void)commandStartMeasureWithZeroingState:(BlockZero)blockZeroState pressure:(BlockPressure)pressure waveletWithHeartbeat:(BlockWavelet)blockWaveletWithHeartbeat waveletWithoutHeartbeat:(BlockWavelet)blockWaveletWithoutHeartbeat result:(BlockMeasureResult)result errorBlock:(BlockError)error;
```
##### BP7
OLD:
```
-(void)commandStartMeasure:(BlockPressure)pressure xiaoboWithHeart:(BlockXioaboWithHeart)xiaobo xiaoboNoHeart:(BlockXioaboNoHeart)xiaoboNoHeart  result:(BlockMesureResult)result errorBlock:(BlockError)error;
```
NEW:
```
-(void)commandStartMeasureWithZeroingState:(BlockZero)blockZeroState pressure:(BlockPressure)pressure waveletWithHeartbeat:(BlockWavelet)blockWaveletWithHeartbeat waveletWithoutHeartbeat:(BlockWavelet)blockWaveletWithoutHeartbeat result:(BlockMeasureResult)result errorBlock:(BlockError)error;
```

### NOTE:
1. add ZeroingState callback, it will continuous send NO when zeroing, and when zeroing ready, it will send YES;
2. change wavelet name from `xiaobo` to `wavelet`
3. change `BlockXioaboWithHeart ` and `BlockXioaboNoHeart ` block type to`BlockWavelet ` 

### 2.Block Type
OLD:
```
typedef void(^BlockStopSuccess)();
typedef void(^BlockSetUnitSuccess)();
typedef void(^BlockSetAngleSuccess)();
typedef void(^BlockSetPresureTargetSuccess)();
```
NEW:
```
typedef void(^BlockSuccess)();
```
### NOTE:
Change all success type blocks into a uniform one



## API Guide

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/tree/master/api-docs)

## Examples

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/tree/master/examples)


## Release Note

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/doc/ReleaseNote.md)

## FAQ

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/doc/FAQ.md)






















