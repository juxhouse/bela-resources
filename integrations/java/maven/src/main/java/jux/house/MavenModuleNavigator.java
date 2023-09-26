package jux.house;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;

import java.io.File;
import java.io.FileReader;
import java.util.List;

public class MavenModuleNavigator {

    public static void main(String[] args) {
        navigateModules("./example-project/pom.xml");
    }

    public static void navigateModules(String pomPath) {
        File pomFile = new File(pomPath);
        if (!pomFile.exists()) {
            System.out.println("POM file does not exist: " + pomPath);
            return;
        }

        MavenXpp3Reader reader = new MavenXpp3Reader();
        try (FileReader fileReader = new FileReader(pomFile)) {
            Model model = reader.read(fileReader);

            // Print basic info about the current POM
            System.out.println("Current POM:");
            System.out.println("ArtifactId: " + model.getArtifactId());
            System.out.println("GroupId: " + model.getGroupId());
            System.out.println("Version: " + model.getVersion());
            System.out.println("Dependencies: " + model.getDependencies());


            // Get modules
            List<String> modules = model.getModules();
            if (modules != null && !modules.isEmpty()) {
                System.out.println("Modules:");
                for (String moduleName : modules) {
                    System.out.println("  - " + moduleName);

                    // Construct the path to the module's POM file
                    File moduleDir = new File(pomFile.getParent(), moduleName);
                    File modulePom = new File(moduleDir, "pom.xml");

                    // Navigate to this module recursively
                    navigateModules(modulePom.getAbsolutePath());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
