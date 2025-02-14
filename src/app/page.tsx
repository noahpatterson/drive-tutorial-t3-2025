"use client"

import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Folder, File, Upload, ChevronRight } from "lucide-react"
import { useState } from "react"

// Mock data
const driveData = [
  {
    id: "1",
    type: "folder",
    name: "Documents",
    children: [
      { id: "2", type: "file", name: "Resume.pdf", url: "/files/resume.pdf" },
      { id: "3", type: "file", name: "Budget.xlsx", url: "/files/budget.xlsx" },
    ],
  },
  {
    id: "4",
    type: "folder",
    name: "Photos",
    children: [
      { id: "5", type: "file", name: "Vacation.jpg", url: "/files/vacation.jpg" },
      { id: "6", type: "file", name: "Family.png", url: "/files/family.png" },
    ],
  },
  { id: "7", type: "file", name: "Project.docx", url: "/files/project.docx" },
]

export default function GoogleDriveClone() {
  const [folderPath, setFolderPath] = useState([{ id: null, name: "My Drive" }])

  const currentFolder = folderPath[folderPath.length - 1].id
  const currentItems = currentFolder ? driveData.find((item) => item.id === currentFolder)?.children || [] : driveData

  const navigateToFolder = (folderId, folderName) => {
    setFolderPath([...folderPath, { id: folderId, name: folderName }])
  }

  const navigateToBreadcrumb = (index) => {
    setFolderPath(folderPath.slice(0, index + 1))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Drive Clone</h1>
      <div className="flex justify-between items-center mb-4">
        <Input type="text" placeholder="Search in Drive" className="max-w-xs" />
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {folderPath.map((folder, index) => (
            <li key={folder.id}>
              <div className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
                <Button
                  variant="link"
                  onClick={() => navigateToBreadcrumb(index)}
                  className={index === folderPath.length - 1 ? "font-semibold" : ""}
                >
                  {folder.name}
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <div className="space-y-2">
        {currentItems.map((item) => (
          <DriveItem key={item.id} item={item} onFolderClick={(id, name) => navigateToFolder(id, name)} />
        ))}
      </div>
    </div>
  )
}

function DriveItem({ item, onFolderClick }) {
  if (item.type === "folder") {
    return (
      <div
        className="flex items-center border rounded p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => onFolderClick(item.id, item.name)}
      >
        <Folder className="mr-2 h-4 w-4" />
        {item.name}
      </div>
    )
  } else {
    return (
      <Link href={item.url} className="flex items-center border rounded p-2 hover:bg-gray-100">
        <File className="mr-2 h-4 w-4" />
        {item.name}
      </Link>
    )
  }
}

