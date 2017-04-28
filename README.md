# RTVLL Notifier

This application was born as a way to fix some shortcomings in currently available systems. As a media organisation, we sometimes need to know the exact location of reporters as the broadcast is running. 

This application solves the fact that we didn't have the exact location mapped. So, what does this do?
 - The notifier component is a Phonegap client app, ready to be packaged and installed onto in-house devices. For iOS, you might need an in-house deployment license. You can also add all the devices (if the amount does not exceed 100) to the provisioning profile in Apple Developer. I use Phonegap Build for the Android version, because I wasn't in a mood to set up my Android environments.
 - The backend component runs on a PHP server. It has a main file, showing a map with the current positions on it. I did not feel the urge to add a MySQL server yet, but that may be a thing in new releases.
 - It also provides a cheat sheet with currently known contacts. 

Any questions? Feel free to ask me at cornelvdheiden@icloud.com.