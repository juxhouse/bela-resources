package jux.house;

import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.FileVisitResult;
import java.nio.file.FileVisitor;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class Integrator {

    List<ClassInfo> classInfoList = new ArrayList<>();

    public void processDirectory(String pathArg) throws IOException {
        Path startingDir = Paths.get(pathArg);
        Files.walkFileTree(startingDir, EnumSet.noneOf(FileVisitOption.class), Integer.MAX_VALUE, new FileVisitor<Path>() {

            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                if (file.toString().endsWith(".class")) {
                    byte[] classBytes = Files.readAllBytes(file);
                    classInfoList.add(CustomClassVisitor.init(classBytes));
                }
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFileFailed(Path file, IOException exc) {
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) {
                return FileVisitResult.CONTINUE;
            }
        });
    }

    public List<ClassInfo> getClassInfoList() {
        return classInfoList;
    }

    public static void main(String[] args) throws IOException {
        Integrator integrator = new Integrator();
        integrator.processDirectory("src/example-project/target/single-directory"); // Adjust this path as needed
        List<ClassInfo> infoList = integrator.getClassInfoList();
        // Do something with infoList
    }
}