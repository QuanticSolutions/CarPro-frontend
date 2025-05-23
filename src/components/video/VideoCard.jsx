import { useState } from 'react'
import { Card } from '@mui/material'
import { styled } from '@mui/system'

const StyledCard = styled(Card)({
  width: 250,
  height: "13rem",
  backgroundSize: "cover",
})

function VideoCard({ data }) {

  return (
    <StyledCard sx={{ backgroundImage: `url(/assets/images/${data.image}.png)`, width: window.innerWidth <= 950 ? 260 : 300 }}>
    </StyledCard>
  )
}

export default VideoCard