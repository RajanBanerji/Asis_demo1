export const containerName = `pdffileuploadv1`;
export const sasToken = 'sv=2021-12-02&ss=bf&srt=co&sp=rwdlaciytfx&se=2023-12-01T02:49:27Z&st=2023-03-15T18:49:27Z&spr=https&sig=8jouTyVrHpkD3FEWXLA9CVcdwv22rhJWA7DmRpxUi8k%3D'
export const storageAccountName = 'documentuploadstrg'; 

export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}