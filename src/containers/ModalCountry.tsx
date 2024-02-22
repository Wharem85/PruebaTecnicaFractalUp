import React from 'react';
import { Box, Typography, Modal, CardMedia, CardContent, IconButton, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
const style = {
  position: 'absolute' as 'absolute',
  top: '72%',
  left: '88%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 0,
  p: 4,
};

interface ModalProps {
	open: boolean;
	setOpen: any;
	country: any;
}

const ModalCountry: React.FC<ModalProps> = ({open, setOpen, country}) => {
	return (
		<Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
    >
      <Box sx={style}>
				<IconButton
          aria-label="Cerrar"
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', top: '5px', right: '10px' }}
        >
          <Close />
        </IconButton>
				<Box sx={{ maxWidth: 400, borderRadius: '30px', marginTop: 1 }}>
					<CardMedia
						component="img"
						height="140"
						image={country.imageUrl}
						alt={country.name}
					/>
					<CardContent>
						<Grid container alignItems="center" spacing={2}>
							<Grid item>
								<img src={country.flagUrl} style={{width: 50}} />
							</Grid>
							<Grid item>
								<Typography gutterBottom variant="h6" component="div" className="name-country">
									<a className="name-country">{country.name}</a>
								</Typography>
								<Typography variant="body2" color="text.secondary" className="name-continent">
									<span className="name-continent">{country.continent?.name}</span>
								</Typography>
							</Grid>
						</Grid>
						<Typography gutterBottom variant="h5" component="div" sx={{margin: '10px 0'}}>
							<div>
								<a className="name-country">Capital: </a>
								<span className="name-continent">{country.capital}</span>
							</div>
						</Typography>
						<Typography gutterBottom variant="h5" component="div" sx={{margin: '10px 0'}}>
							<div>
								<a className="name-country">Lenguages: </a>
								{country?.languages ? (
									country.languages.map((language: any) => (
										<>
											<span key={language.name} className="name-continent">{language.name}</span>
										</>
									))
								) : (
									<p>No se encontraron lenguajes.</p>
								)}
							</div>
						</Typography>
						<Typography gutterBottom variant="h5" component="div" sx={{margin: '10px 0'}}>
							<a className="name-country">Population: </a>
						</Typography>
						<Typography gutterBottom variant="h5" component="div" sx={{margin: '10px 0'}}>
							<div>
								<a className="name-country">Currency: </a>
								{country?.currencies ? (
									country.currencies.map((currencie: any) => (
										<>
											<span key={currencie} className="name-continent">{currencie}</span>
										</>
									))
								) : (
									<p>No se encontraron lenguajes.</p>
								)}
							</div>
						</Typography>
						<Typography gutterBottom variant="h5" component="div" sx={{margin: '10px 0'}}>
							<a className="name-country">Region: </a>
						</Typography>
					</CardContent>
				</Box>
      </Box>
    </Modal>
	)
}

export default ModalCountry;
