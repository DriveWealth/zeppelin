import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function isNumeric(str) {
  if (typeof str === "number") return true;
  if (typeof str !== "string") return false;
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const deviceWidth = Dimensions.get("window").width;

const isViewStyle = (style) => {
  return (
    typeof style === "object" &&
    style !== null &&
    Object.keys(style).includes("height")
  );
};

export default function ScrollPicker({ itemHeight = 30, style, ...props }) {
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0
  );
  const sView = useRef(null);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState(null);

  // console.log(selectedIndex)

  const wrapperHeight =
    props.wrapperHeight ||
    (isViewStyle(style) && isNumeric(style.height)
      ? Number(style.height)
      : 0) ||
    itemHeight * 5;

  useEffect(
    function initialize() {
      if (initialized) return;
      setInitialized(true);

      setTimeout(() => {
        const y = itemHeight * selectedIndex;
        sView?.current?.scrollTo({ y: y });
      }, 0);

      return () => {
        timer && clearTimeout(timer);
      };
    },
    [initialized, itemHeight, selectedIndex, sView, timer]
  );

  const renderPlaceHolder = () => {
    const h = (wrapperHeight - itemHeight) / 2;
    const header = <View style={{ height: h, flex: 1 }} />;
    const footer = <View style={{ height: h, flex: 1 }} />;
    return { header, footer };
  };

  const renderItem = (data, index) => {
    const isSelected = index === selectedIndex;
    const item = props.renderItem ? (
      props.renderItem(data, index, isSelected)
    ) : (
      <Text
        style={
          isSelected
            ? [styles.itemText, styles.itemTextSelected]
            : styles.itemText
        }
      >
        {data}
      </Text>
    );

    return (
      <View style={[styles.itemWrapper, { height: itemHeight }]} key={index}>
        {item}
      </View>
    );
  };
  const scrollFix = useCallback(
    (e) => {
      let y = 0;
      const h = itemHeight;
      if (e.nativeEvent.contentOffset) {
        y = e.nativeEvent.contentOffset.y;
      }
      const _selectedIndex = Math.round(y / h);

      const _y = _selectedIndex * h;
      if (_y !== y) {
        // using scrollTo in ios, onMomentumScrollEnd will be invoked
        if (Platform.OS === "ios") {
          setIsScrollTo(true);
        }
        sView?.current?.scrollTo({ y: _y });
      }
      if (selectedIndex === _selectedIndex) {
        return;
      }
      
      const selectedValue = props.dataSource[_selectedIndex];
      setSelectedIndex(_selectedIndex);
      if (props.onValueChange) {
        props.onValueChange(selectedValue, _selectedIndex);
      }
    },
    [itemHeight, props, selectedIndex]
  );

  const onScrollBeginDrag = () => {
    setDragStarted(true);

    if (Platform.OS === "ios") {
      setIsScrollTo(false);
    }
    timer && clearTimeout(timer);
  };

  const onScrollEndDrag = (e) => {
    setDragStarted(false);

    // if not used, event will be garbaged
    const _e = { ...e };
    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!momentumStarted) {
          scrollFix(_e);
        }
      }, 50)
    );
  };
  const onMomentumScrollBegin = () => {
    setMomentumStarted(true);
    timer && clearTimeout(timer);
  };

  const onMomentumScrollEnd = (e) => {
    setMomentumStarted(false);

    // console.log(e)

    scrollFix(e)

    if (!isScrollTo && !dragStarted) {
      scrollFix(e);
    }
  };

  const { header, footer } = renderPlaceHolder();
  const highlightWidth = (isViewStyle(style) ? style.width : 0) || deviceWidth;
  const highlightColor = props.highlightColor || "#333";

  const wrapperStyle = {
    height: wrapperHeight,
    flex: 1,
    overflow: "hidden",
  };

  const highlightStyle = {
    position: "absolute",
    top: (wrapperHeight - itemHeight) / 2,
    height: itemHeight,
    width: highlightWidth,
    borderTopColor: highlightColor,
    borderBottomColor: highlightColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  return (
    <View style={wrapperStyle}>
      <View style={highlightStyle} />
      <ScrollView
        ref={sView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={(e) => onMomentumScrollBegin(e)}
        onMomentumScrollEnd={(e) => onMomentumScrollEnd(e)}
        onScrollBeginDrag={(e) => onScrollBeginDrag(e)}
        onScrollEndDrag={(e) => onScrollEndDrag(e)}
      >
        {header}
        {props.dataSource.map(renderItem)}
        {footer}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "#999",
  },
  itemTextSelected: {
    color: "#1040C1",
  },
});
