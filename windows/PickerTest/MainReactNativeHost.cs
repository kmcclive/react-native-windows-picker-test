using System.Collections.Generic;
using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;

namespace PickerTest
{
    class MainReactNativeHost : ReactNativeHost
    {
        public override string MainComponentName => "PickerTest";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index";

#if BUNDLE
        protected override string JavaScriptBundleFile => "ms-appx:///ReactAssets/index.windows.bundle";
#endif

        protected override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new CustomReactPackage(),
        };
    }
}
