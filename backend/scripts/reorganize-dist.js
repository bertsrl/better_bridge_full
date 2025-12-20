/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
const backendSrcPath = path.join(distPath, 'backend', 'src');

console.log('🔍 Checking dist structure...');
console.log('Dist path:', distPath);
console.log('Backend src path:', backendSrcPath);
console.log('Backend src exists:', fs.existsSync(backendSrcPath));

if (fs.existsSync(backendSrcPath)) {
  console.log('🔄 Reorganizing dist folder structure...');

  // Move all files from dist/backend/src to dist/
  const files = fs.readdirSync(backendSrcPath);
  console.log('Files to move:', files);

  files.forEach((file) => {
    const srcPath = path.join(backendSrcPath, file);
    const destPath = path.join(distPath, file);

    try {
      if (fs.statSync(srcPath).isDirectory()) {
        if (fs.existsSync(destPath)) {
          console.log(`⚠️  Removing existing directory: ${destPath}`);
          fs.rmSync(destPath, { recursive: true, force: true });
        }
        console.log(`📁 Moving directory: ${file}`);
        fs.renameSync(srcPath, destPath);
      } else {
        if (fs.existsSync(destPath)) {
          console.log(`⚠️  Removing existing file: ${destPath}`);
          fs.unlinkSync(destPath);
        }
        console.log(`📄 Moving file: ${file}`);
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
    } catch (err) {
      console.error(`❌ Error moving ${file}:`, err.message);
    }
  });

  // Remove empty backend/src and backend directories
  try {
    if (fs.existsSync(backendSrcPath)) {
      fs.rmSync(backendSrcPath, { recursive: true, force: true });
    }
    const backendPath = path.join(distPath, 'backend');
    if (fs.existsSync(backendPath)) {
      fs.rmSync(backendPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('⚠️  Error cleaning up backend directory:', err.message);
  }

  // Rewrite require paths: calculate correct depth based on file location
  console.log('🔄 Rewriting require paths in compiled files...');

  function calculateRelativePath(filePath) {
    // Calculate depth of file relative to dist root
    const relativePath = path.relative(distPath, path.dirname(filePath));
    const depth = relativePath === '' ? 0 : relativePath.split(path.sep).length;

    // Build the relative path to _shared
    if (depth === 0) {
      return './_shared';
    } else {
      return '../'.repeat(depth) + '_shared';
    }
  }

  function rewriteRequirePaths(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        rewriteRequirePaths(filePath);
      } else if (file.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Calculate the correct relative path for this file
        const correctPath = calculateRelativePath(filePath);
        const correctPathQuoted = correctPath.replace(/\//g, '/'); // Normalize slashes

        // Match patterns like require("../../../../../../_shared") or require('../../../../../../_shared')
        // Count the number of ../ and replace with calculated path
        const requirePattern = /require\((["'])(\.\.\/)+_shared/g;
        const fromPattern = /from\s+(["'])(\.\.\/)+_shared/g;

        // Replace require() patterns
        content = content.replace(requirePattern, (match, quote) => {
          return `require(${quote}${correctPathQuoted}`;
        });

        // Replace from patterns
        content = content.replace(fromPattern, (match, quote) => {
          return `from ${quote}${correctPathQuoted}`;
        });

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(
            `✅ Rewrote paths in: ${path.relative(
              distPath,
              filePath,
            )} (${correctPathQuoted})`,
          );
        }
      }
    });
  }

  rewriteRequirePaths(distPath);

  console.log('✅ Reorganized dist folder structure');
} else {
  console.log('ℹ️  No reorganization needed - dist/backend/src does not exist');
}
