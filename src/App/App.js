import React from "react";
import "./App.css";
import Fact from "../Fact/Fact";
import Age from "../Age/Age";
import {
  AppRoot,
  View,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Cell,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {
  const [activePanel, setActivePanel] = React.useState("main");

  return (
    <AppRoot>
      <View activePanel={activePanel} onTransition={undefined}>
        <Panel id="main">
          <PanelHeader>Main</PanelHeader>
          <Group>
            <Cell expandable="auto" onClick={() => setActivePanel("fact")}>
              Fact
            </Cell>
            <Cell expandable="auto" onClick={() => setActivePanel("age")}>
              Age
            </Cell>
          </Group>
        </Panel>
        <Panel id="fact">
          <PanelHeader
            delimiter="spacing"
            before={<PanelHeaderBack onClick={() => setActivePanel("main")} />}
          >
            Fact
          </PanelHeader>
          <Fact />
        </Panel>
        <Panel id="age">
          <PanelHeader
            delimiter="spacing"
            before={<PanelHeaderBack onClick={() => setActivePanel("main")} />}
          >
            Age
          </PanelHeader>
          <Age />
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
