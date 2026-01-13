import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

const FAButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClick}>
      {props.icon}
    </TouchableOpacity>
  );
};

export default FAButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
