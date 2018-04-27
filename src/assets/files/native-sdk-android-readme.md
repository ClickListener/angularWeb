# iHealth Device Developer Documentation for Android


This document describes how to use the iHealth Device SDK to accomplish the major operation: Connection Device, Online Measurement, Offline Measurement and iHealth Device Management.

### Latest version

2.4.2

### Support iHealth Device for Android
```java
AM:
iHealth AM3  iHealth AM3S  iHealth AM4  

BG:
iHealth BG1  iHealth BG5	iHealth BG5S

BP:
iHealth BP3L  iHealth BP3M iHealth BP5  iHealth BP7  iHealth BP7S  iHealth KN-550BT  Continua BP iHealth KD723  iHealth KD926  iHealth BPM1	iHealth ABI  iHealth ABPM

HS:
iHealth HS3  iHealth HS4  iHealth HS4S  iHealth HS5  iHealth HS6  iHealth HS2  

PO:
iHealth PO3 iHealth PO3M

Thermometer:
THV3  TS28B
```


## How to use the iHealth SDK

iHealth Device SDK communicate with iHealth Device by USB, Bluetooth, BluetoothLe, Wifi or Audio.  
**USB:** iHealth BP3M  
**Bluetooth:** iHealth BP5, iHealth BP7, iHealth BP7S, iHealth ABI, iHealth HS3, iHealth HS4S, iHealth BG5  
**BluetoothLe:** iHealth AM3, iHealth AM3S, iHealth AM4, iHealth BP3L, iHealth KN-550BT, iHealth KD723, iHealth KD926,iHealth ABPM, iHealth HS4, iHealth PO3(PO3M), iHealth HS2,	THV3,	TS28B
**Audio:** iHealth BG1  
**Wifi:** iHealth BPM1,	iHealth HS5, iHealth HS6


### Configure

Need to introduce the development kit iHealthLibrary.jar.  
Support phone os 4.0+: ABI, BP3M, BP5, BP7, BP7S, BPM1,	BG1, BG5, HS3, HS4S, HS5, HS6  
Support phone os 4.3+: AM3, AM3S, AM4, BP3L, BP550BT, KD723, KD926,	ABPM, HS4, PO3, HS2

Specific configuration as shown below:

> Need ACCESS_COARSE_LOCATION or ACCESS_FINE_LOCATION permission to get scan results in Android API 23+.

<img src="https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/user_permission.png?raw=true" width="100%">

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/ihealth_device_doc.png?raw=true)

### How to apply for SDK permissions

[Click this link](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/doc/Developer_Registration_Application_Instruction.md)   


### How to use the iHealth SDK
 Example：

   Operation procedure for BP5.

##### 1. Initialization iHealth SDK.

```java
iHealthDevicesManager.getInstance().init(MainActivity.this);

```

##### 2. Register callback, and get a callback ID.

```java
/*
* Register callback to the manager. This method will return a callback Id.
*/
int callbackId = iHealthDevicesManager.getInstance().registerClientCallback(iHealthDevicesCallback);
```

##### 3. Add callback filter.

```java
iHealthDevicesManager.getInstance().addCallbackFilterForAddress(clientCallbackId, ...);	iHealthDevicesManager.getInstance().addCallbackFilterForDeviceType(clientCallbackId, ...);
```

##### 4. Authentication.

```java
If you want to use the iHealth Device, you must first call authentication method before connect a device.
Authentication method:
iHealthDevicesManager.getInstance().sdkAuthWithLicense(byte[] licenseDataBuffer);

Where to get the licenseDataBuffer?
1)download the license file form the website after register your app.
2)integrate the license file into your app.
3)read the binary data.

Example:
    try {
        InputStream is = getAssets().open("license.pem");
        int size = is.available();
        byte[] buffer = new byte[size];
        is.read(buffer);
        is.close();
        boolean isPass = iHealthDevicesManager.getInstance().sdkAuthWithLicense(buffer);
        Log.i("info", "isPass:    " + isPass);
    } catch (IOException e) {
        e.printStackTrace();
    } 
If authenticate success(isPass), all the api avaliable, else please check you license on website.
```

##### 5. Discovery an iHealth device or multi devices.

```java
long type = iHealthDevicesManager.DISCOVERY_BP5 | iHealthDevicesManager.DISCOVERY_AM3S;
iHealthDevicesManager.getInstance().startDiscovery(type);
```

```java
private iHealthDevicesCallback iHealthDevicesCallback = new iHealthDevicesCallback() {  
	@Override
    public void onScanDevice(String mac, String deviceType) {
    }
};
```

##### 6. Connection an iHealth device.

```java
iHealthDevicesManager.getInstance().connectDevice(userName, mac, type);
```

```java
private iHealthDevicesCallback iHealthDevicesCallback = new iHealthDevicesCallback() {
	@Override
	    public void onDeviceConnectionStateChange(String mac, String deviceType, int status) {
 	}
};
```

##### 7. Get iHealth device controller.
```java

/*
* Get Bp5 device controller
*/
Bp5Control bp5Control = iHealthDevicesManager.getInstance().getBp5Control(mac);
   
```
##### 8. Invoke some api function.
```java

/*
* Get the Bp5 device battery level
*/
bp5Control.getBattery();

After BP5 response, your can get the battery level value with callback onDeviceNotify and specific action {@link BpProfile#ACTION_BATTERY_BP}
private iHealthDevicesCallback iHealthDevicesCallback = new iHealthDevicesCallback() {  
	@Override
    public void onDeviceNotify(String mac, String deviceType, String action, String message) {
    }
};
   
```

## Download

[Click this link](https://dev.ihealthlabs.com/last-version)

