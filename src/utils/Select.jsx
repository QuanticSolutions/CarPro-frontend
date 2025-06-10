import { useState, useRef, useEffect } from "react";
import { TextField, Box, Typography, ClickAwayListener, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const CustomSelect = ({ 
  options = [], 
  styles = {}, 
  onChange, 
  placeholder = "Select", 
  size = "large", 
  slotProps = {}, 
  label = "", 
  value = "", 
  showStartAndorement = true,
  editable = false
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const { i18n } = useTranslation();

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option.name);
    setSearchText(option.name);
    onChange(option.value);
    setOpen(false);
  };

  const handleInputChange = (event) => {
    if (!editable) return;
    
    const inputValue = event.target.value;
    setSearchText(inputValue);
    setSelected(inputValue);
    
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    
    if (!open && inputValue) {
      setOpen(true);
    }
    
    const exactMatch = options.find(option => 
      option.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (exactMatch) {
      onChange(exactMatch.value);
    }
  };

  const handleClickAway = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpen(false);
      
      if (editable) {
        const exactMatch = options.find(option => 
          option.name.toLowerCase() === searchText.toLowerCase()
        );
        if (!exactMatch && selected) {
          setSearchText(selected);
        }
      }
    }
  };

  const handleFocus = () => {
    setOpen(true);
    if (editable) {
      setSearchText("");
      setFilteredOptions(options);
    }
  };

  const handleTextFieldClick = () => {
    if (!editable) {
      // setOpen(prev => !prev);
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
        setSearchText(matchedOption.name);
        onChange(value);
      }
    }
  }, [value, options]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={containerRef} sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            label={label}
            size={size}
            value={searchText || selected}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onClick={handleTextFieldClick}
            placeholder={placeholder}
            InputProps={{
              readOnly: !editable,
              ...(i18n.language == "ar" && showStartAndorement ?
                {
                  startAdornment: (
                    <IconButton onClick={handleToggle}>
                      <ExpandMoreIcon />
                    </IconButton>
                  )
                } :
                {
                  endAdornment: (
                    <IconButton onClick={handleToggle}>
                      <ExpandMoreIcon />
                    </IconButton>
                  )
                }
              )
            }}
            sx={{
              ...styles.textField, 
              pointerEvents: "auto",
              transform: i18n.language == "ar" && "rotateY(180deg)",
              "& .MuiOutlinedInput-root": {
                display: "flex",
                transform: i18n.language == "ar" && "rotateY(180deg)",
                borderRadius: "0", 
                textAlign: i18n.language == "ar" && "rotateY(180deg)",
                cursor: !editable ? "pointer" : "text"
              },
              "& .MuiOutlinedInput-input": {
                textAlign: i18n.language == "ar" && "right",
                cursor: !editable ? "pointer" : "text"
              }
            }}
          />
        </Box>

        {open && (
          <Box
            ref={dropdownRef}
            sx={{
              position: "fixed",
              top: containerRef.current?.getBoundingClientRect().bottom + window.scrollY,
              left: containerRef.current?.getBoundingClientRect().left + window.scrollX,
              width: containerRef.current?.getBoundingClientRect().width, // Use the actual rendered width
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
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
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
                  <Typography sx={{ textAlign: i18n.language == "ar" && "right" }}>
                    {option.name}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ textAlign: i18n.language == "ar" && "right", color: "#666" }}>
                  No options found
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default CustomSelect;