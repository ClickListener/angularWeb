# iHealth Device Developer Documentation for Android


This document describes how to use the iHealth Device SDK to accomplish the major operation: Connect Device, Online Measurement, Offline Measurement and iHealth Device Management.

### Latest version

2.4.2

### Support iHealth Device for Android
```java
AM:
iHealth AM3  iHealth AM3S  iHealth AM4  

BG:
iHealth BG1  iHealth BG5	iHealth BG5S

BP:
iHealth BP3L  iHealth BP3M iHealth BP5  iHealth BP7  iHealth BP7S  iHealth KN-550BT  Continua BP iHealth KD723  iHealth KD926  iHealth BPM1	iHealth ABI  iHealth ABP100

HS:
iHealth HS3  iHealth HS4  iHealth HS4S  iHealth HS5  iHealth HS6  iHealth HS2  

PO:
iHealth PO3 iHealth PO3M

Thermometer:
THV3  TS28B
```
### Support Update iHealth Device for Android

```javascript

    AM3 AM3S AM4 HS4 HS4S HS2 BG5S PO3M ABP100
    
```

## How to use the iHealth SDK

iHealth Device SDK communicate with iHealth Device by USB, Bluetooth, BluetoothLe, Wifi or Audio.  
**USB:** iHealth BP3M  
**Bluetooth:** iHealth BP5, iHealth BP7, iHealth BP7S, iHealth ABI, iHealth HS3, iHealth HS4S, iHealth BG5  
**BluetoothLe:** iHealth AM3, iHealth AM3S, iHealth AM4, iHealth BP3L, iHealth KN-550BT, iHealth KD723, iHealth KD926,iHealth ABP100, iHealth HS4, iHealth PO3(PO3M), iHealth HS2,	THV3,	TS28B
**Audio:** iHealth BG1  
**Wifi:** iHealth BPM1,	iHealth HS5, iHealth HS6


### Configure

Need to introduce the development kit iHealthLibrary.jar.  
Support phone os 4.0+: ABI, BP3M, BP5, BP7, BP7S, BPM1,	BG1, BG5, HS3, HS4S, HS5, HS6  
Support phone os 4.3+: AM3, AM3S, AM4, BP3L, BP550BT, KD723, KD926,	ABP100, HS4, PO3, HS2

Specific configuration as shown below:

> Need ACCESS_COARSE_LOCATION or ACCESS_FINE_LOCATION permission to get scan results in Android API 23+.

<img src="https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/user_permission.png?raw=true" width="100%">

![box-model](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/ihealth_device_doc.png?raw=true)

### How to apply for SDK permissions

#### [Getting start](https://dev.ihealthlabs.com/getting-start)   


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

#### [Download SDK](https://dev.ihealthlabs.com/last-version)



## FAQ for Android

### 1.Android permission explaination

```java
    <!-- Internet communication and detect / manage Wi-Fi state -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />

    <!-- Bluetooth permission for communicating with iHealth devices -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

    <!-- Permission for writing on device memory -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <!-- Permission for locating user device in order to search beacons -->
    <!-- https://developer.android.com/reference/android/bluetooth/le/BluetoothLeScanner.html#startScan(android.bluetooth.le.ScanCallback) -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <!-- Permission for iHealth BG1 device (which connect with phone by headphone jack) -->
    <uses-permission android:name="android.permission.RECORD_AUDIO"
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

```  

### 2.Android 6.0 location permission

```java
	If targetSdkVersion >= 23, need location permission as follows:

	<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>


	Turn location function for the phone.

```

[Location Permission](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/Location_Permission.png?raw=true)  
[Location Function](https://github.com/iHealthDeviceLabs/iHealthDeviceLabs-Android/blob/master/public/LocationFunction.jpg?raw=true)


### 3.Android 7.0 connect problem   

```java
Connect will fail on Android 7.0 with devices as follows:
1. HS4  Firmware Version < 1.0.5
2. PO3  (Firmware Version < 1.0.5   ||  (Firmware Version = 1.0.5  && Display Version != 11.0.5))
3. PO3M Firmware Version < 2.1.4
4. BP3L  （Firmware Version =1.0.0 && BT Version < 1.2.4）
5. KN-550BT  (Firmware Version =1.0.0 && BT Version < 1.2.4）
6. AM3   All the version
7. AM3S   Firmware Version < 1.1.8
8. AM4   Firmware Version < 1.4.4

```

### 4.Android 8.0 connect problem   

```java
Connect will fail on Android 8.0 with devices as follows:
1. HS4  BT Version <= 1.0.8
2. PO3  BT Version <= 1.0.8
3. PO3M BT Version <= 1.0.8
4. BP3L BT Version <= 1.2.4
5. KN-550 BT Version <= 1.2.4
```
