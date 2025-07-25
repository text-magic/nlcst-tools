"use client";

import { AppShell, Burger, Menu, Button, Text, List } from "@mantine/core";
import { useDisclosure, useFileDialog } from "@mantine/hooks";
import { IconFile, IconClearAll } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { chapterize } from "@text-magic/chapterize";

export default function TextMagic() {
  const [opened, { toggle }] = useDisclosure();
  const fileDialog = useFileDialog({ multiple: false, resetOnOpen: true });

  const [fileContent, setFileContent] = useState<string>("");
  const [chapters, setChapters] = useState<string[]>([]);

  const pickedFile = fileDialog.files?.[0];

  useEffect(() => {
    if (!pickedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result as string);
      setChapters(chapterize(reader.result as string));
    };
    reader.readAsText(pickedFile);
  }, [pickedFile]);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "md", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header className="flex items-center gap-4">
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>File</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>File</Menu.Label>
            <Menu.Item
              leftSection={<IconFile size={14} />}
              onClick={fileDialog.open}
            >
              Open File
            </Menu.Item>
            {pickedFile && (
              <Menu.Item
                leftSection={<IconClearAll size={14} />}
                onClick={fileDialog.reset}
              >
                Clear Files
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>

        {pickedFile && (
          <>
            <Text>{pickedFile.name}</Text>
            <Button onClick={fileDialog.reset}>Clear</Button>
          </>
        )}
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section>Chapter</AppShell.Section>
        <AppShell.Section>
          <List>
            {chapters.map((chapter, index) => (
              <List.Item key={index}>{chapter}</List.Item>
            ))}
          </List>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <h1>File Preview</h1>
        {pickedFile && <p>{fileContent}</p>}
      </AppShell.Main>
    </AppShell>
  );
}
