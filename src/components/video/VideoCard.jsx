import { useState } from 'react'
import { Card } from '@mui/material'
import { styled } from '@mui/system'

const StyledCard = styled(Card)({
  width: 300,
  height: "13rem",
  backgroundSize: "cover",
})

function VideoCard({ data }) {

  return (
    <StyledCard sx={{ backgroundImage: `url(/assets/images/${data.image}.png)`, width: 300 }}>
    </StyledCard>
  )
}

export default VideoCard