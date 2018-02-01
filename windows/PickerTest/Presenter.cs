using ReactNative.Bridge;
using ReactNative.Modules.Core;

namespace PickerTest
{
    public class Presenter : ReactContextNativeModuleBase
    {
        public Presenter(ReactContext reactContext)
            : base(reactContext)
        {

        }

        public override string Name => "Presenter";

        [ReactMethod]
        public void sendReadyEvent()
        {
            SendEvent("optionsChanged",
                new
                {
                    groupOptions = new string[] { "A", "B", "C" },
                    value1Options = new string[] { "A1", "B1", "C1" },
                    value2Options = new string[] { "A2", "B2", "C2" }
                });
            SendEvent("selectionsChanged",
                new
                {
                    group = "A",
                    value1 = "B1",
                    value2 = "A2"
                });
        }

        [ReactMethod]
        public void sendGroupChangedEvent(string group)
        {
            SendEvent("selectionsChanged",
                new
                {
                    group,
                    value1 = group + "1",
                    value2 = group + "2"
                });
        }

        private void SendEvent(string eventName, object parameters)
        {
            Context.GetJavaScriptModule<RCTDeviceEventEmitter>()
                .emit(eventName, parameters);
        }
    }
}
