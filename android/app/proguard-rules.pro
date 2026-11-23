# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Room 2.2.5 (via WorkManager 2.7.0, pulled in by the ads SDK) only keeps the class,
# not its no-arg constructor. R8 full mode (AGP 8+) strips it, so Room fails with
# "Failed to create an instance of androidx.work.impl.WorkDatabase" at startup.
-keepclassmembers class * extends androidx.room.RoomDatabase {
    public <init>();
}
