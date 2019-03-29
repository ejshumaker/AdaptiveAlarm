import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyles, Colors } from "../constants";

class DayPicker extends PureComponent {
  // possibly create getters to return the state of each day button using refs
  constructor() {
    super();
    this.state = {
      sButton: null,
      mButton: null,
      tButton: null,
      wButton: null,
      thButton: null,
      fButton: null,
      saButton: null
    };
    this.updateOnPress = this.updateOnPress.bind(this);
  }

  static propTypes = {
    description: PropTypes.string
  };

  updateOnPress(type) {
    switch (type) {
      case "S":
        if (this.state.sButton === "S") {
          this.setState({ sButton: "default" });
        } else {
          this.setState({ sButton: type });
        }
        break;
      case "M":
        if (this.state.mButton === "M") {
          this.setState({ mButton: "default" });
        } else {
          this.setState({ mButton: type });
        }
        break;
      case "T":
        if (this.state.tButton === "T") {
          this.setState({ tButton: "default" });
        } else {
          this.setState({ tButton: type });
        }
        break;
      case "W":
        if (this.state.wButton === "W") {
          this.setState({ wButton: "default" });
        } else {
          this.setState({ wButton: type });
        }
        break;
      case "Th":
        if (this.state.thButton === "Th") {
          this.setState({ thButton: "default" });
        } else {
          this.setState({ thButton: type });
        }
        break;
      case "F":
        if (this.state.fButton === "F") {
          this.setState({ fButton: "default" });
        } else {
          this.setState({ fButton: type });
        }
        break;
      case "Sa":
        if (this.state.saButton === "Sa") {
          this.setState({ saButton: "default" });
        } else {
          this.setState({ saButton: type });
        }
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.updateOnPress("S")}>
          <Circle
            style={{
              backgroundColor:
                this.state.sButton === "S" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.sButton === "S" ? Colors.black : Colors.white
                }
              ]}
            >
              S
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("M")}>
          <Circle
            style={{
              backgroundColor:
                this.state.mButton === "M" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.mButton === "M" ? Colors.black : Colors.white
                }
              ]}
            >
              M
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("T")}>
          <Circle
            style={{
              backgroundColor:
                this.state.tButton === "T" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.tButton === "T" ? Colors.black : Colors.white
                }
              ]}
            >
              T
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("W")}>
          <Circle
            style={{
              backgroundColor:
                this.state.wButton === "W" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.wButton === "W" ? Colors.black : Colors.white
                }
              ]}
            >
              W
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("Th")}>
          <Circle
            style={{
              backgroundColor:
                this.state.thButton === "Th" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.thButton === "Th" ? Colors.black : Colors.white
                }
              ]}
            >
              Th
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("F")}>
          <Circle
            style={{
              backgroundColor:
                this.state.fButton === "F" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.fButton === "F" ? Colors.black : Colors.white
                }
              ]}
            >
              F
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress("Sa")}>
          <Circle
            style={{
              backgroundColor:
                this.state.saButton === "Sa" ? Colors.primary : Colors.darkGray
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.state.saButton === "Sa" ? Colors.black : Colors.white
                }
              ]}
            >
              Sa
            </Text>
          </Circle>
        </TouchableOpacity>
      </View>
    );
  }
}

const Circle = styled.View`
  width: 35px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});

export default DayPicker;
