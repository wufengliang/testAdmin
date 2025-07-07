/*
 * @Descripttion:生成树结构目录
 * @Author: WuFengliang
 * @Date: 2021-11-29 17:49:56
 * @LastEditTime: 2021-11-29 17:53:26
 */
const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname);

const createDirTree = (dir, skip) => {
    const recur = (curDir) => {
        fs.readdirSync(curDir, { withFileTypes: true }).forEach((value) => {
            if (skip.includes(value.name)) return;
            const childPath = path.join(curDir, value.name);
            const depths = childPath.replace(rootDir, '').split(path.sep).filter(Boolean).length;
            const isDirectory = value.isDirectory();
            const prefix = `${'| '.repeat(depths - 1)}${isDirectory ? '+' : '`'}-- `;
            console.log(`${prefix}${value.name}`);
            if (isDirectory) {
                recur(path.join(curDir, value.name));
            }
        });
    };
    recur(dir);
};

createDirTree(rootDir, ['node_modules', '.vscode', '.git', '.next', '_next']);
