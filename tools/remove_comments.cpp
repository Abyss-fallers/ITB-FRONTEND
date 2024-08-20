#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <filesystem>

void removeComments(const std::string& filePath) {
    std::ifstream inputFile(filePath);
    std::string outputFilePath = filePath + ".tmp";
    std::ofstream outputFile(outputFilePath);

    if (!inputFile.is_open() || !outputFile.is_open()) {
        std::cerr << "Failed to open file: " << filePath << std::endl;
        return;
    }

    std::string line;
    while (std::getline(inputFile, line)) {
        size_t pos = line.find("// ");
        if (pos != std::string::npos) {
            line = line.substr(0, pos);
        }
        outputFile << line << std::endl;
    }

    inputFile.close();
    outputFile.close();

    std::filesystem::rename(outputFilePath, filePath);
}

bool hasExtension(const std::string& filePath, const std::string& extension) {
    if (filePath.length() >= extension.length()) {
        return (0 == filePath.compare(filePath.length() - extension.length(), extension.length(), extension));
    }
    return false;
}

int main(int argc, char* argv[]) {
    for (int i = 1; i < argc; ++i) {
        std::string filePath = argv[i];
        if (hasExtension(filePath, ".ts") || hasExtension(filePath, ".tsx") || hasExtension(filePath, ".js")) {
            removeComments(filePath);
        }
    }
    return 0;
}
