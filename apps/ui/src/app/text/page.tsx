"use client";

import { AppShell, Burger, Menu, Button, Text, List } from "@mantine/core";
import { useDisclosure, useFileDialog } from "@mantine/hooks";
import { IconFile, IconClearAll } from "@tabler/icons-react";
import { useState } from "react";

export default function TextMagic() {
  const [opened, { toggle }] = useDisclosure();
  const fileDialog = useFileDialog();

  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const pickedFiles = Array.from(fileDialog.files ?? []).map((file) => (
    <List.Item key={file.name} onClick={() => setCurrentFile(file.name)}>
      {file.name}
    </List.Item>
  ));

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "md", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
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
            {pickedFiles.length > 0 && (
              <Menu.Item
                leftSection={<IconClearAll size={14} />}
                onClick={fileDialog.reset}
              >
                Clear Files
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section>Navbar</AppShell.Section>
        <AppShell.Section>
          <Text>Files</Text>
          {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <h1>File Preview</h1>
        {currentFile && <p>{currentFile}</p>}
      </AppShell.Main>
    </AppShell>
  );
}
