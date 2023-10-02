package jux.house;

import org.objectweb.asm.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class CustomClassVisitor extends ClassVisitor {
    
    public CustomClassVisitor(int api) {
        super(api);
    }

    // Capture class-level details
    @Override
    public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
        System.out.println("Class: " + name);
        System.out.println("SuperClass: " + superName);
        for (String iface : interfaces) {
            System.out.println("Implements: " + iface);
        }
    }

    // Capture field references
    @Override
    public FieldVisitor visitField(int access, String name, String descriptor, String signature, Object value) {
        System.out.println("Field: " + name + ", Type: " + descriptor);
        return new CustomFieldVisitor(api);
    }

    // Capture method references
    @Override
    public MethodVisitor visitMethod(int access, String name, String descriptor, String signature, String[] exceptions) {
        System.out.println("Method: " + name + ", Signature: " + descriptor);
        return new CustomMethodVisitor(api);
    }

    // Capture annotations at the class level
    @Override
    public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
        System.out.println("Class Annotation: " + descriptor);
        return new CustomAnnotationVisitor(api);
    }

    public static class CustomFieldVisitor extends FieldVisitor {
        public CustomFieldVisitor(int api) {
            super(api);
        }

        // Capture field annotations
        @Override
        public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
            System.out.println("Field Annotation: " + descriptor);
            return new CustomAnnotationVisitor(api);
        }
    }

    public static class CustomMethodVisitor extends MethodVisitor {
        public CustomMethodVisitor(int api) {
            super(api);
        }

        // Capture opcode-based references
        @Override
        public void visitMethodInsn(int opcode, String owner, String name, String descriptor, boolean isInterface) {
            System.out.println("Method Reference: " + owner + "." + name + descriptor);
        }

        @Override
        public void visitFieldInsn(int opcode, String owner, String name, String descriptor) {
            System.out.println("Field Reference: " + owner + "." + name);
        }

        // Capture annotations on method
        @Override
        public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
            System.out.println("Method Annotation: " + descriptor);
            return new CustomAnnotationVisitor(api);
        }
    }

    public static class CustomAnnotationVisitor extends AnnotationVisitor {
        public CustomAnnotationVisitor(int api) {
            super(api);
        }

        // Capture annotation values
        @Override
        public void visit(String name, Object value) {
            System.out.println("Annotation Field: " + name + "=" + value);
        }

        // Capture nested annotations
        @Override
        public AnnotationVisitor visitAnnotation(String name, String descriptor) {
            System.out.println("Nested Annotation: " + descriptor);
            return this;
        }
    }

    public static void main(String[] args) throws Exception {
        Path path = Paths.get("src/example-project/target/single-directory/io/jitpack/SayBye.class");
        byte[] classBytes = Files.readAllBytes(path);
        ClassReader classReader = new ClassReader(classBytes);
        ClassVisitor classVisitor = new CustomClassVisitor(Opcodes.ASM9);
        classReader.accept(classVisitor, 0);
    }
}
