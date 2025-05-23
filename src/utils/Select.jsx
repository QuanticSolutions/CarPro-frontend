import { useState, useRef, useEffect } from "react";
import { TextField, Box, Typography, ClickAwayListener, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const CustomSelect = ({ options = [], styles = {}, onChange, placeholder = "Select", size = "large", slotProps = {}, label = "", value = "", showStartAndorement = true }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const { i18n } = useTranslation();

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option.name);
    onChange(option.value)
    setOpen(false);
  };

  const handleClickAway = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("scroll", handleScroll, true);
    } else {
      window.removeEventListener("scroll", handleScroll, true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  useEffect(() => {
    if (value) {
      const matchedOption = options.find(opt => opt.value == value);
      if (matchedOption) {
        setSelected(matchedOption.name);
        onChange(value);
      }
    }
  }, [value, options]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={containerRef} sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            label={label}
            size={size}
            value={selected}
            onClick={handleToggle}
            placeholder={placeholder}
            sx={{
              ...styles.textField, pointerEvents: "auto",
              transform: i18n.language == "ar" && "rotateY(180deg)",
              "& .MuiOutlinedInput-root": {
                display: "flex",
                transform: i18n.language == "ar" && "rotateY(180deg)",
                borderRadius: "0", textAlign: i18n.language == "ar" && "rotateY(180deg)"
              },
              "& .MuiOutlinedInput-input": {
                textAlign: i18n.language == "ar" && "right",
              }
            }}
            InputProps={i18n.language == "ar" && showStartAndorement ?
              {
                startAdornment: (
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                )
              } :
              {
                endAdornment: (
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                )
              }
            }
          />
        </Box>

        {open && (
          <Box
            ref={dropdownRef}
            sx={{
              position: "fixed",
              top: containerRef.current?.getBoundingClientRect().bottom + window.scrollY,
              left: containerRef.current?.getBoundingClientRect().left + window.scrollX,
              width: styles.textField?.width || containerRef.current?.offsetWidth,
              bgcolor: "#fff",
              color: "black",
              boxShadow: 3,
              borderRadius: 1,
              zIndex: 1300,
              maxHeight: 5 * 48,
              overflowY: "auto",
              ...styles.dropdown
            }}
          >
            {options.map((option, index) => (
              <Box
                key={index}
                onClick={() => handleSelect(option)}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#B71C1C", color: "#fff" }
                }}
              >
                <Typography sx={{ textAlign: i18n.language == "ar" && "right" }}>{option.name}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default CustomSelect;
