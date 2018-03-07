## iHealth Library SDK

### Latest Version: 1.0.2

The goal of Library SDK is to simplify the design and workflow from current layered app solution . The library will be integrated into the APP as a module, all operations are in the same APP that could improve user experience. In the whole measurement system, the library should be a stateless module, without remembering any history or settings. The caller app is responsible for maintain the settings and state.


Spec as follows:

## Feature List

```markdown
1.Add a Device

The caller app asks the library to add a new device with a specific device model; once added, the library sends back the new device's MAC ID to the caller app.

2.Measurement

The caller app asks the library to do a new measurement; once finished, the library sends back the measurement result.

3.Sync Offline Results

The library can read offline records from a measurement device, such as BG5, BG Track, and send back to result list.

4.Customization

When needed, show specific theme along with caller app's brand.
```

## Enums

```markdown
// DEVICE_MODEL
public enum IHLDeviceType {
    IHLDeviceType_UNKNOWN(0),
    IHLDeviceType_BP5(100),
    IHLDeviceType_BP3L(101),
    IHLDeviceType_BPTRACK(102),
    IHLDeviceType_BP7S(103),
    IHLDeviceType_AM3S(200),
    IHLDeviceType_AM4(201),
    IHLDeviceType_PO3(300),
    IHLDeviceType_BG5(400),
    IHLDeviceType_BG5S(401),
    IHLDeviceType_BG1(402),
    IHLDeviceType_HS4(500),
    IHLDeviceType_HS4S(501),
    IHLDeviceType_HS2(502),
    IHLDeviceType_THV3(600),
    IHLDeviceType_ECG3(700),
    IHLDeviceType_ECG3USB(701);
}
    
// cmd
public enum IHLAction {
    IHLActionUnknown(-1),
    IHLActionMeasureData(0),   //measure(not support KN550BT\BP7S)
    IHLActionAddDevice(1),     //add device
    IHLActionSyncData(2),      //sync（not support BP3L）
    IHLActionSyncMeasure(3),   //sync|measure(not support KN550BT\BP7S)
    IHLActionOther(4),       //
    IHLActionMax(5);         //
}

// 1.If Request IHLAction (IHLActionMeasureData|IHLActionSyncData|IHLActionSyncMeasure) with a valid deviceMacOrUUID, the library will need the valid IHLAddType value IHLAddDeviceWithMAC.
// 2.If Request IHLAction (IHLActionMeasureData|IHLActionSyncData|IHLActionSyncMeasure) without a valid deviceMacOrUUID, the library will add a device first, thus need the valid IHLAddType value IHLAddDeviceWithScan or IHLAddDeviceWithQR.
// 3.If Request IHLAction (IHLActionAddDevice), the library will need valid IHLAddType value IHLAddDeviceWithScan or IHLAddDeviceWithQR.
// This parameter is required and should be valid, otherwise you will get a warning.
public enum IHLAddType {
    IHLAddDeviceUnknown(-1),
    IHLAddDeviceWithScan(0),
    IHLAddDeviceWithQR(1),
    IHLAddDeviceWithMAC(2),
    IHLAddDeviceMax(3);
}
    
// CodeType(Only for BG5)
public enum IHLBGCodeType {
    IHLBGQRCode(0),
    IHLBGCodeOther(1);
}

// unit
public enum IHLVitalUnit {
    IHLUnitUNKNOWN(-1),     
    IHLBGUnitMMOLL(0),      // mmol/L
    IHLBGUnitMGDL(1),       // mg/dL
    IHLBPUnitMMHG(2),       // mmHg
    IHLBPUnitKPA(3),        // Kpa
    IHLWeightUnitKG(4),     // kg
    IHLWeightUnitLBS(5),    // lbs
    IHLWeightUnitSTONE(6),  // st
    IHLThermoUnitC(7),      // Celsius
    IHLThermoUnitF(8),      // Degrees Fahrenheit
    IHLAMUnitMile(9),       // mile
    IHLAMUnitKilometer(10); // km
}
    
    
// return status
public enum IHLActionStatus {
    IHLActionNA(0),
    IHLActionSuccess(1),
    IHLActionFailed(2),
    IHLActionCanceled(3);
}

// User sex
public enum IHLUserSex {
        IHLUserSexFemale(0),
        IHLUserSexMale(1);
}

// Swimming function switch
public enum IHLSwimSwitch {
    IHLSwimFunctionOFF(0),
    IHLSwimFunctionON(1);
}

// The desired Library screen display direction
public enum IHScreenOrientation {
    IHScreenOrientationPortrait(0),
    IHScreenOrientationLandscape(1),
    IHScreenOrientationAuto(2);
}


```

## Display customization (Color and logo )

```java
public class CustomTheme{
    int navigationBarColor;
    int titleColor;          //Navigation Title
    int backButtonColor;     //Navigation Back
    int rightButtonColor;    //Navigation RightButton
    int startButtonColor;    //StartButton
    int themeColor;
    int logoImageId;         //logo Image
}

```

## Functional Spec
In general, invoke the library with RequestModel and get the result with ResponseModel.

#### 1. Input params format
```java
class RequestModel{
    String apiVersion;
    IHLDeviceType deviceType;
    String deviceMacOrUUID;
    IHLAction action;
    IHLVitalUnit unit;
    IHLAddType addType;
    IHLBGCodeType stripType;
    String bgGODCode;

    String userId;
    String age;
    String height;
    String weight;
    IHLUserSex userSex;
    IHLSwimSwitch swimSwitch;
    IHScreenOrientation orientation;
    
    //Whether to show the results page, if you want to hide, set true
    boolean isBlind;
}
```
#### 2.Output params format
```java
class IHLOperationStatus{
    IHLActionStatus addStatus;
    IHLActionStatus syncStatus;
    IHLActionStatus measureStatus;
}

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

class ResponseModel{
    //result params
    IHLOperationStatus operationResult;
    String reason;
    Array measureResult;
    Array syncResult;

    //request params
    String apiVersion;
    IHLDeviceType deviceType;
    String deviceMacOrUUID;
    IHLAction action;
    IHLVitalUnit unit;
    IHLAddType addType;
    IHLBGCodeType stripType;
    String bgGODCode;

    String userId; // User's id, range [1, 2147483647(0x7FFFFFFF)]
    String age;    // User's age, range [1, 255]
    String height; // User's height(value int in cm),  range [1, 255]
    String weight; // User's weight(value float in Kg),  range [1.0, 255.0]
    IHLUserSex userSex;
    IHLSwimSwitch swimSwitch;
}
```
## Integration
#### #Android
##### 1. Put the iHealth_library.aar file into the [app_module]/libs folder.

##### 2. Set the build.gradle file of the caller applicatin module

```groovy
android {
    ...
    dataBinding {
        enabled = true
    }
}

repositories {
    flatDir {
        dirs 'libs'   // aar directory
    }
}

dependencies {
    ...
    compile 'com.google.zxing:core:3.2.1'
    implementation 'com.android.support:appcompat-v7:26.1.0'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    compile 'pub.devrel:easypermissions:0.4.0'
    compile 'com.google.code.gson:gson:2.8.0'
    compile(name: 'iHealth_library', ext: 'aar')
}
```


##### 3. Call and receive data from iHealth library

```java
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

import com.ihealth.common.model.RequestModel;
import com.ihealth.common.model.ResponseModel;
import com.libraryapp.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "Library";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding mainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        final RequestModel requestModel = new RequestModel(MainActivity.this);
        requestModel.apiVersion = "100";
        requestModel.deviceType = RequestModel.IHLDeviceType.IHLDeviceType_AM3S;
        requestModel.action = RequestModel.IHLAction.IHLActionAddSync;
        requestModel.addType = RequestModel.IHLAddType.IHLAddDeviceWithScan;
        requestModel.userId = "123456";
        requestModel.age = "18";
        requestModel.userSex = RequestModel.IHLUserSex.IHLUserSexMale;
        requestModel.height = "180";
        requestModel.weight = "60";
        requestModel.swimSwitch = RequestModel.IHLSwimSwitch.IHLSwimFunctionON;
        requestModel.orientation = RequestModel.IHScreenOrientation.IHScreenOrientationAuto;
        requestModel.isBlind = true;
        RequestModel.CustomTheme customTheme = new RequestModel.CustomTheme();
        customTheme.navigationBarColor = Color.GREEN;
        customTheme.titleColor = Color.YELLOW;
        customTheme.backButtonColor = Color.BLUE;
        customTheme.rightButtonColor = Color.GREEN;
        customTheme.startButtonColor = Color.BLUE;
        customTheme.themeColor = Color.RED;
        customTheme.logoImageId = R.drawable.am4;
        requestModel.customTheme = customTheme;
                
        requestModel.setOnReceiveListener(new ResponseModel.OnReceiveListener() {
            @Override
            public void onReceive(ResponseModel responseModel) {
                Log.i(TAG, responseModel.toString());
            }
        });
        mainBinding.start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestModel.start();
            }
        });
    }
}
```
