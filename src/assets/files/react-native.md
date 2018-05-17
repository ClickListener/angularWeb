# iHealth Device Developer Documentation for ReactNative




## Install  

```markdown
 npm install @ihealth/ihealthlibrary-react-native  
 
 If you cannot access the npm repository, you can download the entire package on this site.
```


## Configure module for Android

```java
1. android/settings.gradle    

	include ':ihealthlibrary-react-native'
	project(':ihealthlibrary-react-native').projectDir = new File(rootProject.projectDir,'../node_modules/@ihealth/ihealthlibrary-react-native/android')

2. android/app/build.gradle
	compile project(':ihealthlibrary-react-native')

3. register module (in MainActivity.java)    
	protected List<ReactPackage> getPackages() {  
		return Arrays.<ReactPackage>asList(
		   new MainReactPackage(),
		   new iHealthDeviceManagerPackage()       
	 	);  
	}  

4. configuration of location permission(in AndroidManifest.xml)

<!-- Need ACCESS_COARSE_LOCATION or ACCESS_FINE_LOCATION permission in Android API 23+ -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

```



## Configure module for iOS

```markdown
1. Open your iOS project, add node_modules/@ihealth/ihealthlibrary-react-native/ios/ReactNativeIOSLibrary.xcodeproj to libraries

2. Under 'Build Phases' --  'Link Binary With Libraries', add libReactNativeIOSLibrary.a

```


## Import module

```java
import {
  iHealthDeviceManagerModule,
  BP5Module,
  AM4Module
} from '@ihealth/ihealthlibrary-react-native'
```

## Work Flow

```markdown
1. Use iHealthDeviceManagerModule to scan device, connect device, monitor connection status.

2. Use devieModule (for example AM3SModule) to operate device function.

```


## Demo Api

```markdown
	Discovery:

	//Add listener for event
	DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Device, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
        });

    //Call the api
	iHealthDeviceManagerModule.startDiscovery(iHealthDeviceManagerModule.BP5)  
```

```markdown
	Connect:

	//Add listener for event
	DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
        });
    DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
        });

    //Call the api
	iHealthDeviceManagerModule.connectDevice(mac,type)  
```
```markdown
	Start/Stop Measure:

	//Add listener for event
	DeviceEventEmitter.addListener(BP5Module.Event_Notify, function (e: Event) {
            // handle event.
            console.log('~~~' + JSON.stringify(e))
        });

    //Call the api
	 BP5Module.startMeasure(mac)  
	 BP5Module.stopMeasure(mac)
```
