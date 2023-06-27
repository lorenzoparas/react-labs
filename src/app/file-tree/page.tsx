'use client';

import { useState } from "react";

const files = [
    {
        name: 'node_modules',
        children: [
            {
                name: 'ai',
                children: [
                    {
                        name: 'README.md'
                    }
                ]
            }
        ]
    },
    {
        name: 'public',
        children: [
            {
                name: 'index.html'
            }
        ]
    },
    {
        name: 'package.json'
    },
    {
        name: '.gitignore'
    }
];

const FileTree = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                {
                    files.map(file => {
                        return file.children
                            ? <Folder key={file.name} file={file} depth={0} />
                            : <File key={file.name} file={file} depth={0} />
                    })
                }
            </div>
        </main>

    )
};

const Folder = ({ file, depth }: { file: any, depth: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div
                style={{ marginLeft: `${depth * 20}px`, cursor: 'pointer' }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? '-' : '+'} {file.name}
            </div>
            {
                isExpanded && file.children && file.children.map((child: any) => {
                    return child.children
                        ? <Folder key={child.name} file={child} depth={depth + 1} />
                        : <File key={child.name} file={child} depth={depth + 1} />
                })
            }
        </>

    )
};

const File = ({ file, depth }: { file: any, depth: number }) => {
    return (
        <div style={{ marginLeft: `${depth * 20}px` }}>
            {file.name}
        </div>
    )
};

export default FileTree;
