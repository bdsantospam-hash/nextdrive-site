-- Execute este script no SQL Editor do Supabase para atualizar o email de contacto
-- (a base de dados já foi criada com 'ola@nextdrive.pt'; este comando corrige para o domínio correto)

update info_site set email = 'ola@drivenext.pt' where id = 1;
