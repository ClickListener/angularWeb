# iHealth Device Developer Documentation for iOS

  This document describes how to use the iHealth Device SDK to accomplish the major operation: Connection Device, Online Measurement, Offline Measurement and iHealth Device Management.

### Latest version
2.2.0


### Authentication

```objectivec

  If you want to use the iHealth Device, you must first call authentication method, can call after certification by iHealth relevant methods of the device.

  Authentication method：

  -(void)commandSDKUserValidationWithLicense:(NSData *)licenseData UserDeviceAccess:(DisposeSDKUserDeviceAccess)userDeviceAccess UserValidationSuccess:(DisposeSDKUserValidationSuccess)userValidationSuccess DisposeErrorBlock:(DisposeSDKUserValidationErrorBlock)disposeValidationErrorBlock
  
```
### Support iHealth Device for iOS

```javascript
    BP: 
    iHealth BP3    iHealth BP3L  iHealth BP5  iHealth BP7   iHealth BP7S   iHealth Continua BP iHealth KN550BT     iHealth ABI    iHealth ABP100   iHealth BPM1
    
    HS: 
    iHealth HS2  iHealth HS3    iHealth HS4   iHealth HS4S(Same with HS4)   iHealth HS5 iHealth HS5S  iHealth HS6
    
    AM: 
    iHealth AM3    iHealth AM3S   iHealth AM4  
         
    BG: 
    iHealth BG1    iHealth BG3  iHealth BG5  iHealth BG5S
    
    PO: 
    iHealth PO3  iHealth PO3M
    
    Thermometer:
    
    THV3  TS28B

```
### Support Update iHealth Device for iOS

```javascript

    AM3 AM3S AM4 HS4 HS4S HS2 BG5S PO3M ABP100
    
```

### Relevant files and frameworks
1、Import the following iHealthSDK files：   

```objectivec
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
	
    Library: 
    
    iHealthSDK2.2.0.a
	
    supports iOS 8.0 and above.
```
2、Frameworks

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/public/iOS_ihealth_Frameworks_doc.png?raw=true)


3、Configuration


Add 2 new Item in ‘Supported external accessory protocols’,Different products need to add different protocols.

If you're using BG5, you need to add protocol：com.jiuan.BGV31

If you're using BP3, you need to add protocol：com.jiuan.P930

If you're using BP5 or BP7, you need to add protocol：com.jiuan.BPV20、com.jiuan.BPV23

If you're using ABI, you need to add protocol：com.jiuan.BPV21

If you're using HS3, you need to add protocol：￼com.ihealth.sc221

If you're using BG1，you need to add  Item NSMicrophoneUsageDescription

￼￼￼Add 1 new Item in ‘Required background modes’: App communicates with an accessory、 App communicates using CoreBluetooth

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/public/iOS_ihealth_Configuration_doc.png?raw=true)

### How to apply for SDK permissions

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-iOS/blob/master/doc/Developer_Registration_Application_Instruction.md)

### How to use the iHealth SDK


 Example：

   Operation procedure for BP5.

	a) Register plug-in device info: `BP5ConnectNoti`;

	b) Initialize controller classes:
   ```objectivec
     BP5Controller *controller = [BP5Controller shareBP5Controller];
   ```

   c) Access control class instance after receive `BP5ConnectNoti`: 

	```objectivec
	NSArray *bpDeviceArray = [controller getAllCurrentBP5Instace];
	```

	``` objectivec
	BP5 *bpInstance = [bpDeviceArray objectAtIndex: i];
	```

	d) Using ‘bpInstance’ call communication module of the device


## Download

[Click this link](https://dev.ihealthlabs.com/last-version)























